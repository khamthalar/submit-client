import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-setting-dialog',
  templateUrl: './user-setting-dialog.component.html',
  styleUrls: ['./user-setting-dialog.component.css']
})
export class UserSettingDialogComponent implements OnInit {
  status: string;
  checked;
  constructor(public dialogRef: MatDialogRef<UserSettingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.status == "admin") {
      this.status = "employee";
    } else {
      this.status = "admin";
    }
  }

  ngOnInit() {
  }
  close(click_event) {
    if (click_event == 'save') {
      let data: any;
      if (this.checked) {
        data = { "status": this.status,"action":"save" }
      } else {
        data = { "status": this.data.status,"action":"save" }
      }
      this.dialogRef.close(data);
    } else if (click_event == 'delete') {
      this.dialogRef.close({ "status": this.data.status,"action":"delete" });
    } else if (click_event == 'cancel') {
      this.dialogRef.close({ "status": "none","action":"cancel" });
    }
  }

}
