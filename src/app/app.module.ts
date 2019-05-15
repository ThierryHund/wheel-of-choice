import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config/config.component';
import { WheelComponent } from './components/wheel/wheel.component';
// import {MatInputModule} from '@angular/material';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialModule} from './material-module';



@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    WheelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatFormFieldModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
