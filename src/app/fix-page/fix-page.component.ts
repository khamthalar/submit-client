import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fix-page',
  templateUrl: './fix-page.component.html',
  styleUrls: ['./fix-page.component.css']
})
export class FixPageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FixPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close("data");
  }
}
