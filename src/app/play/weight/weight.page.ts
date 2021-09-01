import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.page.html',
  styleUrls: ['./weight.page.scss'],
})
export class WeightPage implements OnInit {

  public weightFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.weightFormGroup = this.formBuilder.group({
      weightMeasure: ['']
    });
  }

  public enterWeight() {
    console.log('Enter weight button clicked');
  }

}
