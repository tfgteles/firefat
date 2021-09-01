import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacationPage } from './vacation.page';

const routes: Routes = [
  {
    path: '',
    component: VacationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacationPageRoutingModule {}
