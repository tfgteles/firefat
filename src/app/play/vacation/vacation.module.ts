import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacationPageRoutingModule } from './vacation-routing.module';

import { VacationPage } from './vacation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VacationPageRoutingModule
  ],
  declarations: [VacationPage]
})
export class VacationPageModule { }
