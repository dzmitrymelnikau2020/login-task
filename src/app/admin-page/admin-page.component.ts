import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../services';
import { isEqual } from 'lodash';

import { User } from '../models/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, DoCheck {

  profile: User;

  constructor(
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.profile = this.userService.currentUserValue;
  }

  ngDoCheck(): void {
    if (!isEqual(this.profile, this.userService.currentUserValue)) {
      this.profile = this.userService.currentUserValue;
    }
  }

}
