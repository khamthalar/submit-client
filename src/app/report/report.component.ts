import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private router: Router) { }
  displayedColumns = ['position', 'firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  gotoDeskboard() {
    this.router.navigate(['desboard']);
    sessionStorage.setItem('page_name', 'desboard');
  }
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
}
export interface Element {
  position: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com'},
  {position: 2, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com'},
  {position: 3, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com'},
  {position: 4, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com'},
  {position: 5, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com'},
  {position: 6, firstName: 'Test', lastName: 'Last name', email: 'example@email.com'}
];
