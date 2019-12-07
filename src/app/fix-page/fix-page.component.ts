import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FixInfo, EmLog, ContactInfo } from '../submitDevices';
import { FirbaseServiceService } from '../firbase-service.service';
import { isUndefined } from 'util';



@Component({
  selector: 'app-fix-page',
  templateUrl: './fix-page.component.html',
  styleUrls: ['./fix-page.component.css']
})
export class FixPageComponent implements OnInit {





  fix_info: FixInfo = new FixInfo();
  em_log: EmLog = new EmLog();
  usercontact: ContactInfo = new ContactInfo();
  // selected_rd ="";
  // default_rd = "";
  cb_unchecked = true;

  statusText: string;
  deviceStatusText: string;

  // rd1 = false;
  // rd2 = false;
  // rd3 = false;

  @ViewChild('txtStatus') txtstatus: ElementRef;
  @ViewChild('txtDevice') txtdevice: ElementRef;
  @ViewChild('btnApply') btnapply: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FixPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirbaseServiceService
  ) { }

  ngOnInit() {
    this.usercontact.email_address = localStorage.getItem('userEmailAddress');
    this.usercontact.phone_number = localStorage.getItem('userPhonenumber');
    this.em_log.em_id = localStorage.getItem('user_id');
    this.em_log.em_name = localStorage.getItem('user_name');
    if(isUndefined(this.data.fix_info.em_log)){
      this.fix_info.em_log = [];
    }else{
      this.fix_info.em_log = this.data.fix_info.em_log;
    }
    // this.em_log.contact_info = this.usercontact;
    this.txtstatus.nativeElement.disabled = true;
    this.txtdevice.nativeElement.disabled = true;
    this.btnapply.nativeElement.disabled = true;

    this.statusText = this.data.item_status;
    this.deviceStatusText = this.data.fix_info.device_status;

    // if (this.data.fix_info.status == "ລໍຖ້າສ້ອມແປງ") {
    //   this.default_rd = "ລໍຖ້າສ້ອມແປງ";
    //   this.rd_selected("ລໍຖ້າສ້ອມແປງ");
    // } else {
    //   this.default_rd = "ກຳລັງສ້ອມແປງ";
    //   this.rd_selected("ກຳລັງສ້ອມແປງ");
    // }
  }
  cb_click(){
    this.cb_unchecked = !this.cb_unchecked;
  }
  edit_item_status() {
    this.txtstatus.nativeElement.disabled = false;
    this.txtstatus.nativeElement.focus();
  }
  editDevice_status() {
    this.txtdevice.nativeElement.disabled = false;
    this.txtdevice.nativeElement.focus();
  }
  onEdit() {
    if(this.statusText != this.data.item_status || this.deviceStatusText != this.data.fix_info.device_status){
      this.btnapply.nativeElement.disabled = false;
    }else{
      this.btnapply.nativeElement.disabled = true;
    }
  }
  close() {
    this.dialogRef.close("data");
  }
  apply() {
    this.txtdevice.nativeElement.disabled = true;
    this.txtstatus.nativeElement.disabled = true;
    this.btnapply.nativeElement.disabled = true;

    this.submitData();

    // this.firebaseService.updateSubmitItem(this.data.key,{"description":"ເນັດບໍ່ໄດ້"});
  }
  // rd_selected(rd: string) {
  //   this.rd1 = false;
  //   this.rd2 = false;
  //   this.rd3 = false;
  //   if (rd == "ລໍຖ້າສ້ອມແປງ") {
  //     this.rd1 = true;
  //     this.selected_rd = "ລໍຖ້າສ້ອມແປງ";
  //   } else if (rd == "ກຳລັງສ້ອມແປງ") {
  //     this.rd2 = true;
  //     this.selected_rd = "ກຳລັງສ້ອມແປງ";
  //   } else if (rd == "ສ້ອມແປງແລ້ວ") {
  //     this.rd3 = true;
  //     this.selected_rd = "ສ້ອມແປງແລ້ວ";
  //   }
  //   if(this.default_rd !=rd || this.statusText != this.data.item_status || this.deviceStatusText != this.data.fix_info.device_status){
  //     this.btnapply.nativeElement.disabled = false;
  //   }else{
  //     this.btnapply.nativeElement.disabled = true;
  //   }
  // }

  submitData(){
    if(this.statusText != this.data.item_status || this.deviceStatusText != this.data.fix_info.device_status){
      if(this.statusText!="wait for review"){
        console.log(this.usercontact);
      }
    }else{
      // this.dialogRef.close();
    }
    // console.log(this.fix_info);
  }
  checkEmLog(){
    if(this.fix_info.em_log.length==0){
      this.fix_info.em_log.push(this.em_log);
    }else{
      let isduplicate = false;
      this.fix_info.em_log.forEach(element => {
        if(element.em_name==this.em_log.em_name){
          isduplicate = true;
        }
      });
      if(isduplicate==false){
        this.fix_info.em_log.push(this.em_log);
      }
    }
  }
}
