import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor(private auth: AuthService, private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      txtuser: new FormControl(''),
      txtpassword: new FormControl('')
    });
  }
  ngOnInit() {
  }
  login_Clicked() {
    this.loading = true;
    this.auth.getUserDetail(this.loginForm.value.txtuser, this.loginForm.value.txtpassword).then(resp => {
      let result: any = resp;
      if (result.success == true) {
        this.auth.setLogin(true);
        this.router.navigate(['home']);
        localStorage.setItem('user_name', result.name+" "+result.surname);
        localStorage.setItem('user_id',result.user_id);
      } else {
        this.loading = false;
        window.alert('invalid user');
      }
    }, error => {
      this.loading = false;
      window.alert('Can not connect to SERVER, error status:'+error.status+' '+error.statusText);
    });
    
  }
}
