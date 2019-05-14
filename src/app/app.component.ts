import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as anime from 'animejs';
import { ConfigService } from './services/config.service';
import { initDomAdapter } from '@angular/platform-browser/src/browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  constructor() { }
}

