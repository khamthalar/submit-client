import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FirbaseServiceService } from '../firbase-service.service';
import { map } from 'rxjs/operators';
import { userLogin, userContact } from '../submitDevices';
import * as CryptoJS from 'crypto-js';
import { UserSettingDialogComponent } from '../dialogs/user-setting-dialog/user-setting-dialog.component';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.css'],
  animations: [
    trigger('frmState', [
      state('show', style({
        height: 100,
        display: 'block'
      })),
      state('hide', style({
        height: 0,
        display: 'none'
      })),
      transition('show=>hide', [style({ 'display': 'none' }), animate('10ms ease-out')]),
      transition('hide=>show', [style({ 'display': 'block' }), animate('10ms ease-in')])
    ])
  ]
})
export class AdminSettingComponent implements OnInit {
  frmState = 'hide';
  userList: any;
  passwordText: string="";
  confirmpassword: string;
  user: userLogin = new userLogin();
  usercontact: userContact = new userContact();

  userCheck = true;

  constructor(public dialogRef: MatDialogRef<AdminSettingComponent>, private firebaseService: FirbaseServiceService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getuserList();
  }
  close() {
    this.dialogRef.close({ "status": "none" });
  }
  newUser() {
    this.frmState = 'show';
  }
  cancelSubmit() {
    this.frmState = 'hide';
  }
  getuserList() {
    this.firebaseService.getActiveUsers().snapshotChanges().pipe(
      map(user=>{
        return user.map(u=>{
          const data = u.payload.doc.data() as userLogin
          data.key = u.payload.doc.id;
          return data;
        });
      })
    ).subscribe(userList => {
      this.userList = userList;
    })
  }
  userSetting(key:string,status:string, name:string,surname:string){
    const dialogRef = this.dialog.open(UserSettingDialogComponent,{ disableClose: true ,data:{"status":status,"name":name,"surname":surname}});
    dialogRef.afterClosed().subscribe(result => {
      if(result.action=='delete'){
        // let data = {"key":key,"status":result.status,"active":0}
        this.firebaseService.changeUserStatus(key,result.status,0);
      }else if(result.action=='save'){
        this.firebaseService.changeUserStatus(key,result.status,1);
      }
      // console.log(result);
    });
    // this.firebaseService.setUserStatus(key,status);
  }


  submitUser() {
    this.userCheck = true;
    if (this.user.name != undefined) {
      if (this.user.surname != undefined) {
        if (this.user.username != undefined) {
          if (this.passwordText!= "") {
            if (this.passwordText == this.confirmpassword) {
              this.firebaseService.getUser(this.user.username).snapshotChanges().pipe(
                map(user=>{
                  return user.map(u=>{
                    const data = u.payload.doc.data() as userLogin
                    data.key = u.payload.doc.id;
                    return data;
                  });
                })
              ).subscribe(userDetail => {
                if (userDetail.length == 0) {
                  this.user.status = "employee";
                  this.user.password = CryptoJS.AES.encrypt(this.passwordText.trim(), "admin@2k18".trim()).toString();
                  this.user.contactInfo = this.usercontact;
                  // console.log(this.user);
                  this.user.active = 1;
                  this.firebaseService.createUsers(this.user);
                  this.user = new userLogin();
                  this.usercontact = new userContact();
                  this.passwordText = "";
                  this.confirmpassword = "";
                  this.frmState = 'hide';
                  this.userCheck = false;
                } else {
                  if(this.userCheck){
                    window.alert("duplicate username");
                    this.userCheck = true;
                  }
                }

              })
            } else {
              window.alert("password not match");
            }
          } else {
            window.alert("please input a valid password");
          }

        }
        else {
          window.alert("please input a valid username");
        }
      } else {
        window.alert("please input a valid surname");
      }
    } else {
      window.alert("please input a valid name");
    }

  }

}
