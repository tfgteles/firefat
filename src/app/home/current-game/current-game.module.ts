import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentGamePageRoutingModule } from './current-game-routing.module';

import { CurrentGamePage } from './current-game.page';
import { SelectGameComponent } from 'src/app/components/select-game/select-game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentGamePageRoutingModule
  ],
  declarations: [CurrentGamePage, SelectGameComponent]
})
export class CurrentGamePageModule { }
