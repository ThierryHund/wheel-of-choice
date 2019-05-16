import { element } from 'protractor';
import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { Router } from '@angular/router';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, AfterViewInit {


  constructor(private configService: ConfigService,private fb: FormBuilder, public router: Router, private cd: ChangeDetectorRef) { }

  @ViewChildren('items') items: QueryList<ElementRef>;

  form = new FormGroup({
    configItems: new FormArray(
      [
        this.fb.control('', Validators.required),
      ])
    });

  ngOnInit() {
    const config = this.configService.getConfig();
    for (let i = 0; i < config.length - 1; i++) {
      this.addConfigItems();
    }
    this.configItems.patchValue(this.configService.getConfig());

  }

  ngAfterViewInit() {
    this.items.changes.subscribe(() => {
      this.items.last.nativeElement.focus();
    });
  }

  get configItems() {
    return this.form.get('configItems') as FormArray;
  }

  addConfigItems() {
    this.configItems.push(this.fb.control('',  Validators.required));
    this.cd.detectChanges();

  }

  deleteConfigItems(i: number) {
    this.configItems.removeAt(i);
    this.cd.detectChanges();

  }

  onSubmit() {
    this.configService.setConfig(this.configItems.value);
    this.router.navigate(['/']);
  }
}
