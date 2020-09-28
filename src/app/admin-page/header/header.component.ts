import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../services';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() account: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  redirectToLoginPage(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
