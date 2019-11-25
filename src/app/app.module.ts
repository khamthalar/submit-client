import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';


import {MaterialModule} from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminDesboardComponent } from './admin-desboard/admin-desboard.component';

import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { UserSettingDialogComponent } from './dialogs/user-setting-dialog/user-setting-dialog.component';
import { FixPageComponent } from './fix-page/fix-page.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainNavComponent,
    SubmitPageComponent,
    AdminNavComponent,
    AdminDesboardComponent,
    DateAgoPipe,
    AdminSettingComponent,
    UserSettingDialogComponent,
    FixPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents:[AdminSettingComponent,UserSettingDialogComponent,FixPageComponent]
})
export class AppModule { }
