import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService, private messagingService: MessagingService) {

   }
  ngOnInit(): void {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
    if (this.auth.isLogin) {
      this.router.navigate([sessionStorage.getItem('page_name')]);
    } else {
      this.router.navigate(['login']);
    }
  }
}
