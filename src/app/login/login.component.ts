import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }
  ngOnInit() {
    // console.log(this.auth.isLogin);
    // if(this.auth.isLogin){
    //   this.router.navigate(['home']);
    // }
  }
  onSubmit(event){
    event.preventDefault();
    const target=event.target;
    const user = target.querySelector('#user').value;
    const password = target.querySelector('#password').value;
    this.auth.getUserDetail(user,password).subscribe(data=>{
      if(data.success==true){
        this.auth.setLogin(true);
        this.router.navigate(['home']);
      }else{
        window.alert('invalid user');
      }
    });
  }
}
