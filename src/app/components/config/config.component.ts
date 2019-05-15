import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


  constructor(private configService: ConfigService,private fb: FormBuilder, public router: Router) { }

  form = new FormGroup({
    configItems: new FormArray(
      [
        this.fb.control('', Validators.required),
      ])
    });

  ngOnInit() {
  }

  get configItems() {
    return this.form.get('configItems') as FormArray;
  }

  addConfigItems(){
    this.configItems.push(this.fb.control('',  Validators.required));
  }

  deleteConfigItems(i: number) {
    this.configItems.removeAt(i)
  }

  onSubmit() {
    console.warn(this.configItems.value);
    this.configService.setConfig(this.configItems.value);
    this.router.navigate(['/']);
  }
}
