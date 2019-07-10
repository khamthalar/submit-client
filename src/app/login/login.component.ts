import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  //set txtpassword to hide text
  hide = true;

  constructor(private auth:AuthService,private router:Router, fb: FormBuilder) { 
    this.loginForm = fb.group({
      txtuser:new FormControl(''),
      txtpassword: new FormControl('')
    });
  }
  ngOnInit() {
  }
  // onSubmit(event){
  //   event.preventDefault();
  //   const target=event.target;
  //   const user = target.querySelector('#user').value;
  //   const password = target.querySelector('#password').value;
  //   this.auth.getUserDetail(user,password).subscribe(data=>{
  //     if(data.success==true){
  //       this.auth.setLogin(true);
  //       this.router.navigate(['home']);
  //     }else{
  //       window.alert('invalid user');
  //     }
  //   });
  // }
  login_Clicked(){
    // console.log(this.loginForm.value.txtuser)
    this.auth.getUserDetail(this.loginForm.value.txtuser,this.loginForm.value.txtpassword).subscribe(data=>{
      if(data.success==true){
        this.auth.setLogin(true);
        this.router.navigate(['home']);
      }else{
        window.alert('invalid user');
      }
    });

  }
}
