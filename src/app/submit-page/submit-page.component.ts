import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatRadioChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import defualt_data from '../default_data.json';


@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})

export class SubmitPageComponent implements OnInit {
  submitForm: FormGroup;
  test: String;
  rd_select: boolean = false;
  devices: String;

  loading = "";
  loading_onload = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>sending...';
  loading_none = "send";
  loading_status = false;



  constructor(private router: Router, fb: FormBuilder, private http: HttpClient, public dialogRef: MatDialogRef<SubmitPageComponent>) {
    this.submitForm = fb.group({
      rd_device: new FormControl(''),
      txt_rd: new FormControl(''),
      txt_des: new FormControl(''),
      rd_choices: new FormControl(''),
      department: new FormControl(''),
      txtU_Name: new FormControl('')
    })
  }
  ngOnInit() {
    this.loading = this.loading_none;
  }
  // back_Clicked() {
  //   // window.alert(this.submitForm.value.txt_rd);
  //   this.router.navigate(['home']);
  // }
  rd_changed(event: MatRadioChange) {
    if (event.source.id == "rd03") {
      this.rd_select = true;
    } else {
      this.rd_select = false;
    }

  }
  submit() {
    this.loading_status = true;
    this.loading = this.loading_onload;
    if (this.rd_select) {
      this.devices = this.submitForm.value.txt_rd;
    } else {
      this.devices = this.submitForm.value.rd_device;
    }
    let data = {
      "UID": localStorage.getItem("user_id"),
      "U_NAME": localStorage.getItem("user_name"),
      "DEPARTMENT": this.submitForm.value.department,
      "DEVICES": this.devices,
      "DESCRIPTION": this.submitForm.value.txt_des,
      "IMPORTANT": this.submitForm.value.rd_choices,
      "ITEM_STATUS": "1"
    }
    if (data.DEVICES != "") {
      if (data.DESCRIPTION != "") {
        if (data.IMPORTANT != "") {
          if (data.DEPARTMENT != "") {
            this.http.post<any>(defualt_data.base_url + '/submit_devices', data).subscribe(data => {
              if (data.res == "success") {
                this.loading_status = false;
                this.loading = this.loading_none;
                window.alert("Success !")
                this.dialogRef.close({ "status": "success" });
              } else {
                this.loading_status = false;
                this.loading = this.loading_none;
                window.alert(data.res);
              }
            }, (err: HttpErrorResponse) => {
              this.loading_status = false;
              this.loading = this.loading_none;
              window.alert("canot submit data, please contact Administrator!")
            });
          } else {
            this.loading_status = false;
            this.loading = this.loading_none;
            window.alert("please select department");
          }
        } else {
          this.loading_status = false;
          this.loading = this.loading_none;
          window.alert("please select status");
        }
      } else {
        this.loading_status = false;
        this.loading = this.loading_none;
        window.alert("please input valid description");
      }
    } else {
      this.loading_status = false;
      this.loading = this.loading_none;
      window.alert("please select device");
    }

  }
  close() {
    this.dialogRef.close({ "status": "none" });
  }
}
