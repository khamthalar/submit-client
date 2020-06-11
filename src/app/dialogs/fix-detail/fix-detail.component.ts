import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fix-detail',
  templateUrl: './fix-detail.component.html',
  styleUrls: ['./fix-detail.component.css']
})
export class FixDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FixDetailComponent>,@Inject(MAT_DIALOG_DATA) public default_data: any) { }

  ngOnInit() {
    
  }
  close(){
    this.dialogRef.close();
  }
  

}
