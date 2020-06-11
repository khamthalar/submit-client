import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  data: any;
  fix_em_name: string;
  constructor(public dialogRef: MatDialogRef<ItemInfoComponent>,@Inject(MAT_DIALOG_DATA) public defualt_data: any) { }

  ngOnInit() {
    this.data = this.defualt_data;
    if (this.data.fix_em == null) {
      this.fix_em_name = "";
    } else {
      this.fix_em_name = this.data.fix_em.em_name;
    }
  }
  close() {
    this.dialogRef.close();
  }

}
