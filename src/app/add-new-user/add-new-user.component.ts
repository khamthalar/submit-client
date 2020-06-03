import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { userLogin, userContact, Depart } from '../submitDevices';
import { FirbaseServiceService } from '../firbase-service.service';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  depart: Depart = new Depart();
  usercontact: userContact = new userContact();
  userlogin: userLogin = new userLogin();
  passwordText: string;
  confirmpassword: string;
  departList: any;
  depart_item: any;
  showalert:boolean = false;

  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>, @Inject(MAT_DIALOG_DATA) public default_data: any, private firebaseService: FirbaseServiceService) { }

  ngOnInit() {
    this.getDepart();
  }
  close() {
    this.dialogRef.close({ "status": "none" });
  }
  getDepart() {
    this.firebaseService.getDepart().snapshotChanges().pipe(
      map(depart => {
        return depart.map(d => {
          const data = d.payload.doc.data() as Depart;
          data.key = d.payload.doc.id;
          return data;
        });
      })
    ).subscribe(departList => {
      this.departList = departList;
    })
  }
  submitUser() {

    if (this.userlogin.name != undefined) {
      if (this.userlogin.surname != undefined) {
        if (this.userlogin.username != undefined) {
          if (this.passwordText != undefined) {
            if (this.confirmpassword != undefined) {
              if (this.depart_item != undefined) {
                if (this.passwordText == this.confirmpassword) {
                  this.firebaseService.getUser(this.userlogin.username).snapshotChanges().pipe(
                    map(user => {
                      return user.map(u => {
                        const data = u.payload.doc.data() as userLogin
                        data.key = u.payload.doc.id;
                        return data;
                      });
                    })
                  ).subscribe(userDetail => {
                    if (userDetail.length == 0) {
                      this.userlogin.status = "employee";
                      this.userlogin.password = CryptoJS.AES.encrypt(this.passwordText.trim(), "admin@2k18".trim()).toString();
                      this.userlogin.contactInfo = this.usercontact;
                      this.userlogin.active = 1;
                      this.userlogin.department = JSON.parse(this.depart_item);
                      this.firebaseService.createUsers(this.userlogin);
                      this.dialogRef.close({ "status": "success" });
                    }else{
                      this.showalert = true;
                    }
                  });
                } else {
                  window.alert("password not match");
                }
              } else {
                const depar_ = document.getElementById('depart') as HTMLInputElement;
                depar_.focus();
              }
            } else {
              const txtconfirmpassword = document.getElementById('txtconfirmpassword') as HTMLInputElement;
              txtconfirmpassword.focus();
            }

          } else {
            const txtpassword = document.getElementById('txtpassword') as HTMLInputElement;
            txtpassword.focus();
          }

        } else {
          const txtusername = document.getElementById('txtusername') as HTMLInputElement;
          txtusername.focus();
        }
      } else {
        const txtsurname = document.getElementById('txtsurname') as HTMLInputElement;
        txtsurname.focus();
      }

    } else {
      const txtname = document.getElementById('txtname') as HTMLInputElement;
      txtname.focus();
    }

  }
}
