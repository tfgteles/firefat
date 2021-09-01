import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupLeaderPageRoutingModule } from './group-leader-routing.module';

import { GroupLeaderPage } from './group-leader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GroupLeaderPageRoutingModule
  ],
  declarations: [GroupLeaderPage]
})
export class GroupLeaderPageModule { }
