import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


  constructor(private fb: FormBuilder) { }

  form = new FormGroup({
    configItems: new FormArray(
      [
        this.fb.control('')
      ])
    });

  ngOnInit() {
  }

  get configItems() {
    return this.form.get('configItems') as FormArray;
  }

  addConfigItems(){
    this.configItems.push(this.fb.control(''));
  }

  onSubmit() {

  }
}
