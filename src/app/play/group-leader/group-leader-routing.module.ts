import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupLeaderPage } from './group-leader.page';

const routes: Routes = [
  {
    path: '',
    component: GroupLeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupLeaderPageRoutingModule {}
