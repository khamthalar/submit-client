import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent, MatDialog, MatAccordion } from '@angular/material';
import { FirbaseServiceService } from '../firbase-service.service';
import { map, buffer } from 'rxjs/operators';
import { Submit_device } from '../submitDevices';
import * as XLSX from 'xlsx';
import { FixDetailComponent } from '../dialogs/fix-detail/fix-detail.component';
import { EditLogComponent } from '../dialogs/edit-log/edit-log.component';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  deviceList: Submit_device[];

  constructor(private router: Router, private firebaseService: FirbaseServiceService, private dialog: MatDialog) { }
  // displayedColumns = ['device', 'Department'];
  displayedColumns = ['device1', 'device', 'issue', 'department', 'submit_date', 'log'];
  dataSource = new MatTableDataSource(this.deviceList);

  fileName = 'lsw_device_fix_ex' + Date.now() + ".xlsx";

  minDate: Date;
  maxDate: Date;

  startDate: Date = null;
  endDate: Date = null;
  openfilter: boolean = false;

  depart: string;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  ngOnInit() {

    if (sessionStorage.getItem('depart') == null) {
      this.depart = "";
    } else {
      this.depart = sessionStorage.getItem('depart');
    }
    if (sessionStorage.getItem('rp_start_date') == null || sessionStorage.getItem('rp_start_date') == "") {
      this.startDate = null;
    } else {
      this.startDate = new Date(sessionStorage.getItem('rp_start_date'));
    }
    if (sessionStorage.getItem('rp_end_date') == null || sessionStorage.getItem('rp_end_date') == "") {
      this.endDate = null;
    } else {
      this.endDate = new Date(sessionStorage.getItem('rp_end_date'));
    }
    this.loadData();
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
    if (this.endDate != null) {
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate;
      }
    } else {
      this.endDate = this.startDate;
    }
  }
  endDateSelect(event: MatDatepickerInputEvent<Date>) {
    this.maxDate = event.value;
    this.endDate = event.value;
  }
  setOpenFilter() {
    this.openfilter = !this.openfilter;
  }
  // getdata() {
  //   if (this.startDate != undefined && this.endDate != undefined) {
  //     // console.log(this.startDate.getFullYear());
  //     const date1 = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), 0, 0);
  //     const date2 = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), 23, 59);
  //     // console.log(date1+"\r\n"+date2);
  //     // console.log("start:"+this.startDate+",end:"+this.endDate)
  //     this.firebaseService.getAllFixedDevices(date1.getTime(), date2.getTime()).snapshotChanges().pipe(
  //       map(device => {
  //         return device.map(d => {
  //           const data = d.payload.doc.data() as Submit_device
  //           data.key = d.payload.doc.id;
  //           return data;
  //         });
  //       })
  //     ).subscribe(devicelist => {
  //       this.dataSource = new MatTableDataSource(devicelist);
  //       this.dataSource.paginator = this.paginator;
  //     });
  //   }
  // }
  show_fix_detail(data: string) {
    const dialogRef = this.dialog.open(FixDetailComponent, { disableClose: true, data: data });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  log_clicked(item) {
    const dialogRef = this.dialog.open(EditLogComponent, { disableClose: true, data: item });
  }
  apply_click() {
    sessionStorage.setItem('depart', this.depart);
    if (this.startDate != null) {
      sessionStorage.setItem('rp_start_date', this.startDate.toLocaleDateString());
    }
    if (this.endDate != null) {
      sessionStorage.setItem('rp_end_date', this.endDate.toLocaleDateString());
    }
    this.loadData();
  }

  loadData() {
    if (this.startDate == null || this.endDate == null) {
      if (this.depart == null || this.depart == "") {
        this.firebaseService.getFixedDevices(null, null, null).snapshotChanges().pipe(
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
      } else {
        this.firebaseService.getFixedDevices(null, null, this.depart).snapshotChanges().pipe(
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
    } else {
      const date1 = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), 0, 0);
      const date2 = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), 23, 59);
      if (this.depart == null || this.depart == "") {
        this.firebaseService.getFixedDevices(date1.getTime(), date2.getTime(), null).snapshotChanges().pipe(
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
      } else {
        this.firebaseService.getFixedDevices(date1.getTime(), date2.getTime(), this.depart).snapshotChanges().pipe(
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
  }
  clearFilter() {
    sessionStorage.setItem('depart', "");
    sessionStorage.setItem('rp_start_date', "");
    sessionStorage.setItem('rp_end_date', "");
    this.depart = "";
    this.startDate = null;
    this.endDate = null;
    this.loadData();
  }
  //export to excel
  export() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);

    ws['!cols'] = [];
    ws['!cols'][0] = { hidden: true };
    ws['!cols'][5] = { hidden: true };

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

}
