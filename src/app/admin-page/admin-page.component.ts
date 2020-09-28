import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';

import { User } from '../models/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  profile: User;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.currentUserValue.subscribe(
      data => this.profile = data
    );
  }
}
