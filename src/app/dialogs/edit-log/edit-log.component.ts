import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-log',
  templateUrl: './edit-log.component.html',
  styleUrls: ['./edit-log.component.css']
})
export class EditLogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditLogComponent>,@Inject(MAT_DIALOG_DATA) public default_data: any) { }

  ngOnInit() {
    // console.log(this.defualt_data);
  }
  close(){
    this.dialogRef.close();
  }

}
