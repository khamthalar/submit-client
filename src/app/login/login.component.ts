import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirbaseServiceService } from '../firbase-service.service';
import { userLogin, userContact } from '../submitDevices';

import { map } from 'rxjs/operators';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

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


    this.firebaseService.getUserDetial(username).snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({
          key: c.payload.key, ...c.payload.val()
        })
      ))
    ).subscribe(userDetail => {
      // console.log(userDetail);
      // console.log(userDetail.length);
      if (userDetail.length == 0) {
        window.alert("Incorrect username");
      } else if (userDetail.length == 1) {
        
        if (CryptoJS.AES.decrypt(userDetail[0].password.trim(), "admin@2k18".trim()).toString(CryptoJS.enc.Utf8) == this.loginForm.value.txtpassword) {
          this.auth.setLogin(true);
          if(userDetail[0].status=="admin"){
            this.router.navigate(['desboard']);
            localStorage.setItem('page_name','desboard');
          }else if(userDetail[0].status=="employee"){
            this.router.navigate(['home']);
            localStorage.setItem('page_name','home');
          }
          localStorage.setItem('user_name', userDetail[0].name+" "+userDetail[0].surname);
          localStorage.setItem('user_id', userDetail[0].key);
          localStorage.setItem('userPhonenumber',userDetail[0].contactInfo.phonenumber);
          localStorage.setItem('userEmailAddress',userDetail[0].contactInfo.email);
          this.user = userDetail[0];
        } else {
          window.alert("Incorrect password");
        }
      }
    })

    //   this.auth.getUserDetail(this.loginForm.value.txtuser, this.loginForm.value.txtpassword).then(resp => {
    //     let result: any = resp;
    //     if (result.success == true) {
    //       this.auth.setLogin(true);
    //       this.router.navigate(['home']);
    //       localStorage.setItem('user_name', result.name+" "+result.surname);
    //       localStorage.setItem('user_id',result.user_id);
    //     } else {
    //       this.loading = false;
    //       window.alert('invalid user');
    //     }
    //   }, error => {
    //     this.loading = false;
    //     window.alert('Can not connect to SERVER, error status:'+error.status+' '+error.statusText);
    //   });

  }
}
