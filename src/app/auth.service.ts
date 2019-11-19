import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import default_data from './default_data.json';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data_return: any = "test";
  constructor(private http: HttpClient) { }

  setLogin(value: boolean) {
    localStorage.setItem('logedin', value.toString());
  }
  get isLogin() {
    return JSON.parse(localStorage.getItem('logedin') || 'false');
  }
  getUserDetail(user, password) {
    let data = {
      "user": user,
      "password": password
    }

    // return new Promise((resolve, reject) => {
    //   this.http.post(default_data.base_url + '/getUser', data).subscribe(
    //     res => {
    //       resolve(res); //value to return out of the promise
    //     }, (err: HttpErrorResponse) => {
    //       reject(err); //returning Error
    //     }
    //   );
    // });//end Promise
  }
}
