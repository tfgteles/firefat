import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutFirefatComponent } from './about-firefat/about-firefat.component';
import { GroupRankingComponent } from './group-ranking/group-ranking.component';

import { InfoPage } from './info.page';
import { PersonalProgressComponent } from './personal-progress/personal-progress.component';
import { PrizeComponent } from './prize/prize.component';

const routes: Routes = [
  {
    path: '',
    component: InfoPage
  },
  {
    path: 'personal-progress',
    component: PersonalProgressComponent
  },
  {
    path: 'group-ranking',
    component: GroupRankingComponent
  },
  {
    path: 'prize',
    component: PrizeComponent
  },
  {
    path: 'about-firefat',
    component: AboutFirefatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPageRoutingModule { }
