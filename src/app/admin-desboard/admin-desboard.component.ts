import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FirbaseServiceService } from '../firbase-service.service';
import {map} from 'rxjs/operators';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { trigger,state,style,animate,transition} from '@angular/animations';
import { FixPageComponent } from '../fix-page/fix-page.component';
import { Submit_device } from '../submitDevices';

@Component({
  selector: 'app-admin-desboard',
  templateUrl: './admin-desboard.component.html',
  styleUrls: ['./admin-desboard.component.css'],
  animations:[
    trigger('divstate',[
      state('show',style({
        opacity:1,
        display:'block'
      })),
      state('hide',style({
        opacity:0,
        display:'none'
      })),
      transition('show=>hide',animate('200ms ease-out')),
      transition('hide=>show',animate('200ms ease-in'))
    ])
    // trigger('secoundState',[
    //   state('show',style({
    //     height:100,
    //     opacity:1
    //   })),
    //   state('hide',style({
    //     height:0,
    //     opacity:0
    //   })),
    //   transition('show=>hide',animate('300ms ease-out')),
    //   transition('hide=>show',animate('300ms ease-in'))
    // ])
  ]
})
export class AdminDesboardComponent implements OnInit {

  @ViewChild("mainNav") mainnav:AdminNavComponent;
  deviceList:any;
  divstate = 'show';
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
    this.firebaseService.getSubmitDevice_list().snapshotChanges().pipe(
      map(device=>{
        return device.map(d=>{
          const data = d.payload.doc.data() as Submit_device
          data.key = d.payload.doc.id;
          return data;
        });
      })
    ).subscribe(devicelist=>{
      this.deviceList = devicelist;
      this.mainnav.spin = false;
      this.divstate = 'hide';
    })
  }

  refreshData(){
    this.divstate = 'show';
    this.deviceList=null;
    this.getDeviceList();
  }
  showFixPage(item){
    const dialogRef = this.dialog.open(FixPageComponent,{ disableClose: true,data: item});
    dialogRef.afterClosed().subscribe(result => {
      if(result.status=="success"){
        // this.updateData();
      }
    });
  }
  log_clicked(){
    window.alert("test");
  }
}
