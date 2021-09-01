import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayPage } from './play.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPage
  },
  {
    path: 'weight',
    loadChildren: () => import('./weight/weight.module').then( m => m.WeightPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'vacation',
    loadChildren: () => import('./vacation/vacation.module').then( m => m.VacationPageModule)
  },
  {
    path: 'group-leader',
    loadChildren: () => import('./group-leader/group-leader.module').then( m => m.GroupLeaderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPageRoutingModule {}
