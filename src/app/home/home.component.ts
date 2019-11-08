import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SubmitPageComponent } from '../submit-page/submit-page.component';
import { HttpClient } from '@angular/common/http';

import default_data from '../default_data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  submit_device_info:any;

  constructor(private auth:AuthService,private router:Router,private dialog:MatDialog,private http:HttpClient) { }
  username:string;
  ngOnInit() {
    this.username = localStorage.getItem('user_name');
    this.updateData();
  }
  logout(){
    this.auth.setLogin(false);
    localStorage.setItem('user_name', "");
    localStorage.setItem('user_id','');
    this.router.navigate(['login']);
  }
  // newSubmit(){
  //   this.router.navigate(['submit']);
  // }
  openDialog(): void {
    // open calendar popup
    const dialogRef = this.dialog.open(SubmitPageComponent);

    // catch event popup closed
    dialogRef.afterClosed().subscribe(result => {
      if(result.status=="success"){
        this.updateData();
      }
    });
  }
  updateData(){
    this.http.get<any>(default_data.base_url+'/get_client_devices_submit').subscribe(result=>{
      this.submit_device_info = result;
    });
  }
  getImg(){
    return "assets/images/wifi.svg";
  }
}
