import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,MatMenuModule,MatCardModule,MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ToggleComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
