import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyGamePageRoutingModule } from './apply-game-routing.module';

import { ApplyGamePage } from './apply-game.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApplyGamePageRoutingModule
  ],
  declarations: [ApplyGamePage]
})
export class ApplyGamePageModule { }
