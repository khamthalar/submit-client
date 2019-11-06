import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SubmitPageComponent } from '../submit-page/submit-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private dialog:MatDialog) { }

  ngOnInit() {
  }
  logout(){
    this.auth.setLogin(false);
    this.router.navigate(['login']);
  }
  newSubmit(){
    this.router.navigate(['submit']);
  }
  openDialog(): void {
    // open calendar popup
    const dialogRef = this.dialog.open(SubmitPageComponent);

    // catch event popup closed
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

      // this.departures_date = new Date(result.fromdate.year, result.fromdate.month - 1, result.fromdate.day);
      // this.returns_date = new Date(result.todate.year, result.todate.month - 1, result.todate.day);

      // // set date from popup
      // this.departures_month = this.months_text[this.departures_date.getMonth()];
      // this.departures_day = this.days_text[this.departures_date.getDay()];
      // this.returns_month = this.months_text[this.returns_date.getMonth()];
      // this.returns_day = this.days_text[this.returns_date.getDay()];
    });
  }
}
