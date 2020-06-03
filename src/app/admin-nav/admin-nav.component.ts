import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';

import { map } from 'rxjs/operators';
import { AdminSettingComponent } from '../admin-setting/admin-setting.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  username: string;
  spin = false;
  title:string;
  isHomePage:boolean = true;

  @Output() logOut_Clicked: EventEmitter<any> = new EventEmitter();
  @Output() refresh_Clicked: EventEmitter<any> = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private router: Router) { }
  logout() {
    this.logOut_Clicked.emit();
  }
  ngOnInit() {
    this.username = sessionStorage.getItem('user_name');
  }
  refresh() {
    this.spin = true;
    this.refresh_Clicked.emit();
  }
  openReport() {
    this.router.navigate(['report']);
    sessionStorage.setItem('page_name', 'report');
  }
  openDialog(): void {
    this.router.navigate(['admin_setring']);
    sessionStorage.setItem('page_name', 'admin_setring');
  }

}
