import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>,@Inject(MAT_DIALOG_DATA) public default_data: any) { }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
  }
}
