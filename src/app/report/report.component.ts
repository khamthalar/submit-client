import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { FirbaseServiceService } from '../firbase-service.service';
import { map } from 'rxjs/operators';
import { Submit_device } from '../submitDevices';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  deviceList: Submit_device[];

  constructor(private router: Router, private firebaseService: FirbaseServiceService) { }
  displayedColumns = ['device', 'Department'];
  dataSource = new MatTableDataSource(this.deviceList);

  minDate: Date;
  maxDate: Date;

  startDate: Date;
  endDate: Date;

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
}

// export interface Element {
//   position: number;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// const ELEMENT_DATA: Element[] = [
//   { position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com' },
//   { position: 2, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com' },
//   { position: 3, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com' },
//   { position: 4, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com' },
//   { position: 5, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com' },
//   { position: 6, firstName: 'Test', lastName: 'Last name', email: 'example@email.com' }
// ];
