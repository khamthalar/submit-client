import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwToolbarMixedModesError, MatDialog } from '@angular/material';
import { SubmitPageComponent } from '../submit-page/submit-page.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  @Output() logOut_Clicked:EventEmitter<any>=new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {}
  logout(){
    this.logOut_Clicked.emit();
  }

}
