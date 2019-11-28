import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FixInfo, EmLog, ContactInfo } from '../submitDevices';
import { FirbaseServiceService } from '../firbase-service.service';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-fix-page',
  templateUrl: './fix-page.component.html',
  styleUrls: ['./fix-page.component.css']
})
export class FixPageComponent implements OnInit {





  fix_info: FixInfo = new FixInfo();
  em_log: EmLog = new EmLog();
  usercontact: ContactInfo = new ContactInfo();

  statusText: string;
  deviceStatusText: string;
  default_status;
  rd1 = false;
  rd2 = false;
  rd3 = false;

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
    this.em_log.contact_info = this.usercontact;
    this.txtstatus.nativeElement.disabled = true;
    this.txtdevice.nativeElement.disabled = true;
    this.btnapply.nativeElement.disabled = true;
    this.statusText = this.data.item_status;
    this.deviceStatusText = this.data.fix_info.device_status;
    if (this.data.fix_info.status == "ລໍຖ້າສ້ອມແປງ") {
      this.rd_selected("rd1");
    } else {
      this.default_status = false;
      this.rd_selected("rd2");
    }
  }
  // rd_click(value) {
  //   this.rdselected = value;
  //   this.onEdit();
  // }
  edit_item_status() {
    this.txtstatus.nativeElement.disabled = false;
    this.txtstatus.nativeElement.focus();
  }
  editDevice_status() {
    this.txtdevice.nativeElement.disabled = false;
    this.txtdevice.nativeElement.focus();
  }
  onEdit() {
    if (this.statusText != this.data.item_status || this.deviceStatusText != this.data.fix_info.device_status) {
      this.btnapply.nativeElement.disabled = false;
    } else {
      this.btnapply.nativeElement.disabled = true
    }
  }
  close() {
    this.dialogRef.close("data");
  }
  apply() {
    this.txtdevice.nativeElement.disabled = true;
    this.txtstatus.nativeElement.disabled = true;
    this.btnapply.nativeElement.disabled = true;

    // this.firebaseService.updateSubmitItem(this.data.key,{"description":"ເນັດບໍ່ໄດ້"});
  }
  rd_selected(rd: string) {
    this.rd1 = false;
    this.rd2 = false;
    this.rd3 = false;
    if (rd == "rd1") {
      this.rd1 = true;
    } else if (rd == "rd2") {
      this.rd2 = true;
    } else if (rd == "rd3") {
      this.rd3 = true;
    }
  }
}
