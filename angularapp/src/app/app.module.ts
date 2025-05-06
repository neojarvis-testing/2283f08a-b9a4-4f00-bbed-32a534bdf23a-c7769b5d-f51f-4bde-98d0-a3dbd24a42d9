import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { AdminaddworkoutComponent } from './components/adminaddworkout/adminaddworkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    AdminaddworkoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
