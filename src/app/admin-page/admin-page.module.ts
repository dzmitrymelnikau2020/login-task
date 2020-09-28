import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { UserService } from '../services';

import { AdminPageRoutingModule } from './admin-page-routing.module';

import { AdminPageComponent } from './admin-page.component';
import { HeaderComponent } from './header/header.component';
import { MockupComponent } from './mockup/mockup.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    AdminPageComponent,
    HeaderComponent,
    MockupComponent,
    PersonalDetailsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
  ],
  providers: [
    UserService
  ],
  exports: [
    AdminPageComponent,
  ]
})
export class AdminPageModule { }
