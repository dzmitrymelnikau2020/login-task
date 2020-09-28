import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';


import { LoginComponent } from './login/login.component';
import { Page404Component } from './common-components/page404/page404.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '404', component: Page404Component },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
