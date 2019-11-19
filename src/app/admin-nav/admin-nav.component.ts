import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  username:string;

  @Output() logOut_Clicked:EventEmitter<any>=new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {}
  logout(){
    this.logOut_Clicked.emit();
  }
  ngOnInit() {
    this.username = localStorage.getItem('user_name');
  }

}
