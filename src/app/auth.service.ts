import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  setLogin(value:boolean){
    localStorage.setItem('logedin',value.toString());
  }
  get isLogin(){
    return JSON.parse(localStorage.getItem('logedin')||'false');
  }
  getUserDetail(user,password){
    let data = {
      "user":user,
      "password":password
    }
    return this.http.post<any>('http://localhost:8080/api/public/getUser',data);
  }
}
