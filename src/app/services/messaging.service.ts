import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { Playload } from '../submitDevices';
import { PlayState } from '@angular/core/src/render3/interfaces/player';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  angularFireDB: any;
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      });
      // this.angularFireMessaging.messages.subscribe(
      //   (payload:Playload) => {
      //       console.log("new message received. ", payload);
      //       const NotificationOptions = {
      //               body: payload.notification.body,
      //               title: payload.notification.title
      //             }
      //             navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
      //               registration.showNotification(payload.notification.title, NotificationOptions);
      //             });
      //       this.currentMessage.next(payload);})
  }
}