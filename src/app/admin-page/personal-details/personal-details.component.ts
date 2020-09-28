import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  @Input() profile: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.userService.getUserFromLocalStorage().id).subscribe(
      data => this.profile = data
    );
  }

  redirectToEditPage(): void{
    this.router.navigate(['/admin/edit-profile']);
  }
}
