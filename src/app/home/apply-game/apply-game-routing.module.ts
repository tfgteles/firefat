import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyGamePage } from './apply-game.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyGamePageRoutingModule {}
