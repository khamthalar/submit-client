import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FirbaseServiceService } from '../firbase-service.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-desboard',
  templateUrl: './admin-desboard.component.html',
  styleUrls: ['./admin-desboard.component.css']
})
export class AdminDesboardComponent implements OnInit {

  deviceList:any;
  constructor(
    private auth:AuthService,
    private router:Router,
    private dialog:MatDialog,
    private firebaseService:FirbaseServiceService
    ) { }

  ngOnInit() {
    this.getDeviceList();
  }
  logout(){
    this.auth.setLogin(false);
    localStorage.setItem('user_name', "");
    localStorage.setItem('user_id','');
    this.router.navigate(['login']);
  }

  getDeviceList(){
    this.firebaseService.getSubmitDeviceList().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({
        key:c.payload.key,...c.payload.val()
      })))
    ).subscribe(devicelist=>{
      this.deviceList = devicelist;
    })
  }

}
