import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { MockupComponent } from './mockup/mockup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '', component: AdminPageComponent, children: [
      {
        path: 'personal-details', component: PersonalDetailsComponent
      },
      {
        path: 'edit-profile', component: EditProfileComponent
      },
      {
        path: 'organization-permissions', component: MockupComponent
      },
      {
        path: 'login-security', component: MockupComponent
      },
      {
        path: 'products', component: MockupComponent
      },
      {
        path: 'activity', component: MockupComponent
      },
      {
        path: '', redirectTo: 'personal-details', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: '404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
