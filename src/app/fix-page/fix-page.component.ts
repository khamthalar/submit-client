import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FixInfo, EmLog, ContactInfo, fix_em, Submit_device } from '../submitDevices';
import { FirbaseServiceService } from '../firbase-service.service';
import { isUndefined } from 'util';

import { map } from 'rxjs/operators';



@Component({
  selector: 'app-fix-page',
  templateUrl: './fix-page.component.html',
  styleUrls: ['./fix-page.component.css']
})
export class FixPageComponent implements OnInit {





  fix_info: FixInfo = new FixInfo();
  em_log: EmLog = new EmLog();
  usercontact: ContactInfo = new ContactInfo();
  fix_em: fix_em = new fix_em();
  selectedIndex = 0;

  // selected_rd ="";
  // default_rd = "";
  cb_unchecked = true;

  statusText: string;
  deviceStatusText: string;
  fix_em_name: string;
  fix_note:string;

  data: any;

  // rd1 = false;
  // rd2 = false;
  // rd3 = false;

  @ViewChild('txtStatus') txtstatus: ElementRef;
  @ViewChild('txtDevice') txtdevice: ElementRef;
  @ViewChild('btnApply') btnapply: ElementRef;
  @ViewChild('tab') tab_page: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FixPageComponent>,
    @Inject(MAT_DIALOG_DATA) public defualt_data: any,
    private firebaseService: FirbaseServiceService
  ) { }

  ngOnInit() {
    this.data = this.defualt_data;
    this.usercontact.email_address = sessionStorage.getItem('userEmailAddress');
    this.usercontact.phone_number = sessionStorage.getItem('userPhonenumber');
    this.em_log.em_id = sessionStorage.getItem('user_id');
    this.em_log.em_name = sessionStorage.getItem('user_name');
    if (isUndefined(this.data.fix_info.em_log)) {
      this.fix_info.em_log = [];
    } else {
      this.fix_info.em_log = this.data.fix_info.em_log;
    }
    if (this.data.fix_em == null) {
      this.fix_em_name = "";
    } else {
      this.fix_em_name = this.data.fix_em.em_name;
    }
    // this.em_log.contact_info = this.usercontact;
    // this.txtstatus.nativeElement.disabled = true;
    // this.txtdevice.nativeElement.disabled = true;
    this.btnapply.nativeElement.disabled = true;

    this.statusText = this.data.item_status;
    this.deviceStatusText = this.data.fix_info.device_status;
    this.fix_note = this.data.fix_info.fix_note;

    // if (this.data.fix_info.status == "ລໍຖ້າສ້ອມແປງ") {
    //   this.default_rd = "ລໍຖ້າສ້ອມແປງ";
    //   this.rd_selected("ລໍຖ້າສ້ອມແປງ");
    // } else {
    //   this.default_rd = "ກຳລັງສ້ອມແປງ";
    //   this.rd_selected("ກຳລັງສ້ອມແປງ");
    // }
  }
  cb_click() {
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
    if (this.fix_info.fix_note == "") {
      this.fix_info.fix_note = null;
    }
    if (this.statusText != this.data.item_status || this.deviceStatusText != this.data.fix_info.device_status || this.fix_info.fix_note != this.data.fix_info.fix_note) {
      this.btnapply.nativeElement.disabled = false;
    } else {
      this.btnapply.nativeElement.disabled = true;
    }
  }
  close() {
    this.dialogRef.close("data");
  }
  apply() {
    if (this.fix_note == null || this.fix_note == this.data.fix_info.fix_note) {
      this.btnapply.nativeElement.disabled = true;

      this.submitData();
      this.updatedata(this.data.key);
    } else {
      if (this.deviceStatusText != "wait for review") {
        this.btnapply.nativeElement.disabled = true;

        this.submitData();
        this.updatedata(this.data.key);
      } else {
        window.alert("ຕ້ອງໃສ່ສາເຫດຂອງອຸປະກອນກ່ອນ");
        this.selectedIndex = 0;
        this.txtdevice.nativeElement.focus();
      }
    }
    // this.txtdevice.nativeElement.disabled = true;
    // this.txtstatus.nativeElement.disabled = true;

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

  setLog(em_id:string,em_name:string) {
    if (this.statusText == "wait for review") {

      if (this.deviceStatusText != "wait for review") {

        this.fix_info.em_log.push(this.getEmLog_item(
          em_id, em_name, 'update ສາເຫດ "' + this.deviceStatusText + '"', Date.now()
        ));

        this.fix_info.em_log.push(this.getEmLog_item(
          em_id, em_name, 'ເພີ່ມຂໍ້ຄວາມເຖິງຜູ້ແຈ້ງ "ກຳລັງສ້ອມແປງ"', Date.now()
        ));

        this.fix_info.em_log.push(this.getEmLog_item(
          em_id, em_name, 'update ຜູ້ຮັບຜິດຊອບ "' + sessionStorage.getItem('user_name') + '"', Date.now()
        ));

        this.fix_info.em_log.push(this.getEmLog_item(
          em_id, em_name, 'update status "ກຳລັງສ້ອມແປງ"', Date.now()
        ));
        this.fix_info.device_status = this.deviceStatusText;
        this.fix_info.status = "ກຳລັງສ້ອມແປງ";

        this.fix_em.em_id = sessionStorage.getItem('user_id');
        this.fix_em.em_name = sessionStorage.getItem('user_name');
        this.fix_em.contact_info = this.usercontact;


        let submit_data = {
          "fix_info": this.fix_info,
          "fix_em": this.fix_em,
          "item_status": "ກຳລັງສ້ອມແປງ"
        }
        this.firebaseService.updateItem(this.data.key, submit_data);
      }
    } else {
      if (this.data.fix_em == null) {
        let em_id = sessionStorage.getItem('user_id');
        let em_name = sessionStorage.getItem('user_name');

        this.fix_info.em_log.push(this.getEmLog_item(
          em_id, em_name, 'ເພີ່ມຂໍ້ຄວາມເຖິງຜູ້ແຈ້ງ "' + this.statusText + '"', Date.now()
        ));
        this.fix_info.em_log.push(this.getEmLog_item(
          em_id, em_name, 'update ຜູ້ຮັບຜິດຊອບ "' + sessionStorage.getItem('user_name') + '"', Date.now()
        ));

        this.fix_em.em_id = sessionStorage.getItem('user_id');
        this.fix_em.em_name = sessionStorage.getItem('user_name');
        this.fix_em.contact_info = this.usercontact;

        if (this.deviceStatusText != this.data.fix_info.device_status) {
          this.fix_info.em_log.push(this.getEmLog_item(
            em_id, em_name, 'update ສາເຫດ "' + this.deviceStatusText + '"', Date.now()
          ));
          this.fix_info.em_log.push(this.getEmLog_item(
            em_id, em_name, 'update status "ກຳລັງສ້ອມແປງ"', Date.now()
          ));
          this.fix_info.device_status = this.deviceStatusText;
          this.fix_info.status = "ກຳລັງສ້ອມແປງ";
        } else {
          this.fix_info.device_status = this.data.fix_info.device_status;
          this.fix_info.status = this.data.fix_info.status;
        }
        let submit_data = {
          "fix_info": this.fix_info,
          "fix_em": this.fix_em,
          "item_status": this.statusText
        }
        // console.log(submit_data);
        this.firebaseService.updateItem(this.data.key, submit_data);


      } else {
        this.fix_info = this.data.fix_info;
        let em_id = sessionStorage.getItem('user_id');
        let em_name = sessionStorage.getItem('user_name');
        if (this.statusText == this.data.item_status) {
          if (this.deviceStatusText != this.data.fix_info.device_status) {
            this.fix_info.em_log.push(this.getEmLog_item(
              em_id, em_name, 'update ສາເຫດ "' + this.deviceStatusText + '"', Date.now()
            ));
            this.fix_info.device_status = this.deviceStatusText;
            if (this.data.fix_info.status == "ລໍຖ້າສ້ອມແປງ") {
              this.fix_info.status = "ກຳລັງສ້ອມແປງ";
              this.fix_info.em_log.push(this.getEmLog_item(
                em_id, em_name, 'update status "ກຳລັງສ້ອມແປງ"', Date.now()
              ));
            }

            this.firebaseService.updateItem(this.data.key, { "fix_info": this.fix_info });
          }
        } else {
          if (this.deviceStatusText == this.data.fix_info.device_status) {
            this.fix_info.em_log.push(this.getEmLog_item(
              em_id, em_name, 'ເພີ່ມຂໍ້ຄວາມເຖິງຜູ້ແຈ້ງ "' + this.statusText + '"', Date.now()
            ));

            this.firebaseService.updateItem(this.data.key, { "fix_info": this.fix_info, "item_status": this.statusText });
          } else {
            this.fix_info.em_log.push(this.getEmLog_item(
              em_id, em_name, 'ເພີ່ມຂໍ້ຄວາມເຖິງຜູ້ແຈ້ງ "' + this.statusText + '"', Date.now()
            ));
            this.fix_info.em_log.push(this.getEmLog_item(
              em_id, em_name, 'update ສາເຫດ "' + this.deviceStatusText + '"', Date.now()
            ));

            this.fix_info.device_status = this.deviceStatusText;

            this.firebaseService.updateItem(this.data.key, { "fix_info": this.fix_info, "item_status": this.statusText });
          }
        }
      }

    }
  }
  submitData() {
    let em_id = sessionStorage.getItem('user_id');
    let em_name = sessionStorage.getItem('user_name');
    if (this.fix_note == null || this.fix_note == this.data.fix_info.fix_note) {
      this.setLog(em_id,em_name);
    } else {
      this.setLog(em_id,em_name);
      this.fix_info.em_log.push(this.getEmLog_item(
        em_id, em_name, 'update ວິທິການສ້ອມແປງ', Date.now()
      ));
      this.fix_info.fix_note = this.fix_note;
      this.firebaseService.updateItem(this.data.key, { "fix_info": this.fix_info });
    }
  }
  btnOk_click() {
    if (this.fix_note == null || this.fix_note == this.data.fix_info.fix_note) {
      let em_id = sessionStorage.getItem('user_id');
      let em_name = sessionStorage.getItem('user_name');
      this.fix_info = this.data.fix_info;
      if (this.btnapply.nativeElement.disabled == true) {
        if (this.cb_unchecked == false) {
          this.fix_info.em_log.push(this.getEmLog_item(
            em_id, em_name, 'close job', Date.now()
          ));
          this.firebaseService.updateItem(this.data.key, { "success": 1, "fix_info": this.fix_info })
        }
      } else {
        this.submitData();
        if (this.cb_unchecked == false) {
          this.fix_info.em_log.push(this.getEmLog_item(
            em_id, em_name, 'close job', Date.now()
          ));
          this.firebaseService.updateItem(this.data.key, { "success": 1, "fix_info": this.fix_info })
        }
      }
      this.dialogRef.close("data");
    } else {
      if (this.deviceStatusText == "wait for review") {
        window.alert("ຕ້ອງໃສ່ສາເຫດຂອງອຸປະກອນກ່ອນ");
        this.selectedIndex = 0;
        this.txtdevice.nativeElement.focus();
      } else {
        let em_id = sessionStorage.getItem('user_id');
        let em_name = sessionStorage.getItem('user_name');
        this.fix_info = this.data.fix_info;
        if (this.btnapply.nativeElement.disabled == true) {
          if (this.cb_unchecked == false) {
            this.fix_info.em_log.push(this.getEmLog_item(
              em_id, em_name, 'close job', Date.now()
            ));
            this.firebaseService.updateItem(this.data.key, { "success": 1, "fix_info": this.fix_info })
          }
        } else {
          this.submitData();
          if (this.cb_unchecked == false) {
            this.fix_info.em_log.push(this.getEmLog_item(
              em_id, em_name, 'close job', Date.now()
            ));
            this.firebaseService.updateItem(this.data.key, { "success": 1, "fix_info": this.fix_info })
          }
        }
        this.dialogRef.close("data");
      }

    }
  }
  getEmLog_item(id: string, name: string, action: string, issus_time: number): EmLog {
    let em: EmLog = new EmLog();
    em.em_id = id;
    em.em_name = name;
    em.issus_time = issus_time;
    em.action = action;
    return em;
  }

  updatedata(key: string) {
    this.firebaseService.getDeviceItem(key).ref.get().then(device => {
      this.data.fix_info = device.data().fix_info;
      this.data.fix_em = device.data().fix_em;
      this.data.item_status = device.data().item_status;
    })

  }
}
