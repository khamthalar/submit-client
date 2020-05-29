import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirbaseServiceService } from '../firbase-service.service';
import { userLogin, userContact } from '../submitDevices';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  //set txtpassword to hide text
  hide = true;

  loading = false;

  user: userLogin = new userLogin();

  usercontact: userContact = new userContact();


  constructor(private auth: AuthService, private router: Router, fb: FormBuilder,
    private firebaseService: FirbaseServiceService
  ) {
    this.loginForm = fb.group({
      txtuser: new FormControl(''),
      txtpassword: new FormControl('')
    });
  }
  ngOnInit() {
  }
  login_Clicked() {
    this.loading = true;
    // this.user.name = "test";
    // this.user.surname = "em001";
    // this.user.status = "employee";
    // this.user.username= "em001";
    // this.user.password = CryptoJS.AES.encrypt("em001".trim(),"admin@2k18".trim()).toString();
    // this.usercontact.email = "em001@email.com";
    // this.usercontact.phonenumber = "+8562055210711";
    // this.user.contactInfo = this.usercontact;

    // console.log(this.user);

    // this.firebaseService.createUser(this.user);

    let username = this.loginForm.value.txtuser;
    //  let password = CryptoJS.AES.encrypt(this.loginForm.value.txtpassword.trim(),"admin@2k18".trim()).toString();

    //  console.log(username+"_"+password);


    // this.firebaseService.getUserDetial(username).snapshotChanges().pipe(
    //   map(changes => changes.map(
    //     c => ({
    //       key: c.payload.key, ...c.payload.val()
    //     })
    //   ))
    // ).subscribe(userDetail => {
    //   // console.log(userDetail);
    //   // console.log(userDetail.length);
    //   if (userDetail.length == 0) {
    //     window.alert("Incorrect username");
    //   } else if (userDetail.length == 1) {
        
    //     if (CryptoJS.AES.decrypt(userDetail[0].password.trim(), "admin@2k18".trim()).toString(CryptoJS.enc.Utf8) == this.loginForm.value.txtpassword) {
    //       this.auth.setLogin(true);
    //       if(userDetail[0].status=="admin"){
    //         this.router.navigate(['desboard']);
    //         localStorage.setItem('page_name','desboard');
    //       }else if(userDetail[0].status=="employee"){
    //         this.router.navigate(['home']);
    //         localStorage.setItem('page_name','home');
    //       }
    //       localStorage.setItem('user_name', userDetail[0].name+" "+userDetail[0].surname);
    //       localStorage.setItem('user_id', userDetail[0].key);
    //       localStorage.setItem('userPhonenumber',userDetail[0].contactInfo.phonenumber);
    //       localStorage.setItem('userEmailAddress',userDetail[0].contactInfo.email);
    //       this.user = userDetail[0];
    //     } else {
    //       window.alert("Incorrect password");
    //     }
    //   }
    // })

    this.firebaseService.getUser(username).snapshotChanges().pipe(
      map(user=>{
        return user.map(u=>{
          const data = u.payload.doc.data() as userLogin
          data.key = u.payload.doc.id;
          return data;
        });
      })
    ).subscribe(data=>{
      if(data.length==0){
        window.alert("Incorrect username");
        this.loading = false;
      }else if(data.length==1){
        if (CryptoJS.AES.decrypt(data[0].password.trim(), "admin@2k18".trim()).toString(CryptoJS.enc.Utf8) == this.loginForm.value.txtpassword) {
                this.auth.setLogin(true);
                if(data[0].status=="admin"){
                  this.router.navigate(['desboard']);
                  // localStorage.setItem('page_name','desboard');
                  sessionStorage.setItem('page_name','desboard');
                }else if(data[0].status=="employee"){
                  this.router.navigate(['home']);
                  // localStorage.setItem('page_name','home');
                  sessionStorage.setItem('page_name','home');
                }
                // localStorage.setItem('user_name', data[0].name+" "+data[0].surname);
                // localStorage.setItem('user_id', data[0].key);
                // localStorage.setItem('userPhonenumber',data[0].contactInfo.phonenumber);
                // localStorage.setItem('userEmailAddress',data[0].contactInfo.email);
                
                sessionStorage.setItem('user_name', data[0].name+" "+data[0].surname);
                sessionStorage.setItem('user_id', data[0].key);
                sessionStorage.setItem('userPhonenumber',data[0].contactInfo.phonenumber);
                sessionStorage.setItem('userEmailAddress',data[0].contactInfo.email);
                this.user = data[0];
              } else {
                window.alert("Incorrect password");
                this.loading = false;
              }
      }
    });
  }
}
