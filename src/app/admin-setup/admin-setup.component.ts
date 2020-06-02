import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';
import { FirbaseServiceService } from '../firbase-service.service';
import { userLogin, userContact } from '../submitDevices';
import { map } from 'rxjs/operators';
import { UserSettingDialogComponent } from '../dialogs/user-setting-dialog/user-setting-dialog.component';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';

@Component({
  selector: 'app-admin-setup',
  templateUrl: './admin-setup.component.html',
  styleUrls: ['./admin-setup.component.css']
})
export class AdminSetupComponent implements OnInit {

  user: userLogin = new userLogin();
  usercontact: userContact = new userContact();
  dataSource = new MatTableDataSource<userLogin>();

  constructor(private router: Router, private firebaseService: FirbaseServiceService,public dialog: MatDialog) { }

  displayedColumns: string[] = ['user', 'depart', 'status'];
  users_num:number = 0;
  ngOnInit() {
    this.load_user();
  }
  gotoDeskboard() {
    this.router.navigate(['desboard']);
    sessionStorage.setItem('page_name', 'desboard');
  }
  user_refresh(){

  }
  newUsers(){
    const dialogRef = this.dialog.open(AddNewUserComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  load_user(){
    this.firebaseService.getActiveUsers().snapshotChanges().pipe(
      map(user=>{
        return user.map(u=>{
          const data = u.payload.doc.data() as userLogin
          data.key = u.payload.doc.id;
          return data;
        });
      })
    ).subscribe(userList => {
      this.dataSource = new MatTableDataSource<userLogin>(userList);
      this.users_num = userList.length;
      // console.log(userList);
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
}
