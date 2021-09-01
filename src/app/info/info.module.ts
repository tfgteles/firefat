import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { InfoPage } from './info.page';
import { PersonalProgressComponent } from './personal-progress/personal-progress.component';
import { GroupRankingComponent } from './group-ranking/group-ranking.component';
import { PrizeComponent } from './prize/prize.component';
import { AboutFirefatComponent } from './about-firefat/about-firefat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule
  ],
  declarations: [
    InfoPage,
    PersonalProgressComponent,
    GroupRankingComponent,
    PrizeComponent,
    AboutFirefatComponent
  ]
})
export class InfoPageModule { }
