import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { FirbaseServiceService } from '../firbase-service.service';
import { map } from 'rxjs/operators';
import { Submit_device } from '../submitDevices';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  deviceList: Submit_device[];

  constructor(private router: Router, private firebaseService: FirbaseServiceService) { }
  // displayedColumns = ['device', 'Department'];
  displayedColumns = ['device1','device', 'issue', 'department', 'submit_date'];
  dataSource = new MatTableDataSource(this.deviceList);

  fileName = 'lsw_device_fix_ex' + Date.now() + ".xlsx";

  minDate: Date;
  maxDate: Date;

  startDate: Date;
  endDate: Date;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.firebaseService.getAllFixedDevicesNoDate().snapshotChanges().pipe(
      map(device => {
        return device.map(d => {
          const data = d.payload.doc.data() as Submit_device
          data.key = d.payload.doc.id;
          return data;
        });
      })
    ).subscribe(devicelist => {
      // this.deviceList = devicelist;
      this.dataSource = new MatTableDataSource(devicelist);
      this.dataSource.paginator = this.paginator;
    });
  }
  gotoDeskboard() {
    this.router.navigate(['desboard']);
    sessionStorage.setItem('page_name', 'desboard');
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  startDateSelect(event: MatDatepickerInputEvent<Date>) {
    this.minDate = event.value;
    this.startDate = event.value;
    this.getdata();
  }
  endDateSelect(event: MatDatepickerInputEvent<Date>) {
    this.maxDate = event.value;
    this.endDate = event.value;
    this.getdata();
  }

  getdata() {
    if (this.startDate != undefined && this.endDate != undefined) {
      // console.log(this.startDate.getFullYear());
      const date1 = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), 0, 0);
      const date2 = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), 23, 59);
      // console.log(date1+"\r\n"+date2);
      // console.log("start:"+this.startDate+",end:"+this.endDate)
      this.firebaseService.getAllFixedDevices(date1.getTime(), date2.getTime()).snapshotChanges().pipe(
        map(device => {
          return device.map(d => {
            const data = d.payload.doc.data() as Submit_device
            data.key = d.payload.doc.id;
            return data;
          });
        })
      ).subscribe(devicelist => {
        this.dataSource = new MatTableDataSource(devicelist);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  //export to excel
  export() {
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    // ws['!cols'][0]={hidden:true};
    
    ws['!cols'] = [];
    ws['!cols'][0] = { hidden:true };
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}
