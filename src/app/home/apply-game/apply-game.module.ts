import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyGamePageRoutingModule } from './apply-game-routing.module';

import { ApplyGamePage } from './apply-game.page';
import { SelectGameComponent } from 'src/app/components/select-game/select-game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApplyGamePageRoutingModule
  ],
  declarations: [ApplyGamePage, SelectGameComponent]
})
export class ApplyGamePageModule { }
