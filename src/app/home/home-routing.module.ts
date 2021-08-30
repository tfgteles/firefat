import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'create-game',
    loadChildren: () => import('./create-game/create-game.module').then( m => m.CreateGamePageModule)
  },
  {
    path: 'apply-game',
    loadChildren: () => import('./apply-game/apply-game.module').then( m => m.ApplyGamePageModule)
  },
  {
    path: 'current-game',
    loadChildren: () => import('./current-game/current-game.module').then( m => m.CurrentGamePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
