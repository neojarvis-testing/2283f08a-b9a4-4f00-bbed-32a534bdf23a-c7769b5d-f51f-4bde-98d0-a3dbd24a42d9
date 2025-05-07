import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminaddworkoutComponent } from './components/adminaddworkout/adminaddworkout.component';
import { AdmineditworkoutComponent } from './components/admineditworkout/admineditworkout.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewworkoutComponent } from './components/adminviewworkout/adminviewworkout.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RequestedworkoutComponent } from './components/requestedworkout/requestedworkout.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserappliedworkoutComponent } from './components/userappliedworkout/userappliedworkout.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewworkoutComponent } from './components/userviewworkout/userviewworkout.component';
import { UserworkoutformComponent } from './components/userworkoutform/userworkoutform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminaddworkoutComponent,
    AdmineditworkoutComponent,
    AdminnavComponent,
    AdminviewworkoutComponent,
    ErrorComponent,
    HomePageComponent,
    RequestedworkoutComponent,
    SignupComponent,
    UserappliedworkoutComponent,
    UsernavComponent,
    UserviewworkoutComponent,
    UserworkoutformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }