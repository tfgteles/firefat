import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { CanEnterMainPageGuard } from '../services/can-enter-main-page.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    canActivate: [CanEnterMainPageGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'play',
        loadChildren: () =>
          import('../play/play.module').then((m) => m.PlayPageModule),
      },
      {
        path: 'info',
        loadChildren: () =>
          import('../info/info.module').then((m) => m.InfoPageModule),
      },
      {
        path: 'message',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },
      {
        path: '',
        redirectTo: '/main/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
