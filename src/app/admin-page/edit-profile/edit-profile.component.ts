import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { UserService } from '../../services';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  person: User;
  editProfileForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.currentUserValue.subscribe(
      data => this.person = data
    );

    this.editProfileForm = new FormGroup({
      firstName: new FormControl(
        this.person.firstName,
        [Validators.required]
      ),
      lastName: new FormControl(
        this.person.lastName,
        [Validators.required]
      ),
      email: new FormControl(
        this.person.email,
        [Validators.required, Validators.email]
      ),
      phoneNumber: new FormControl(
        this.person.phoneNumber,
        [Validators.required, Validators.minLength(10)]
      ),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editProfileForm.controls; }

  numericOnly(event): boolean {
    const pattern = /^([0-9+()-])$/;
    return pattern.test(event.key);
  }

  handleFormSubmit = (): void => {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }

    this.userService.updateUser({...this.person, ...this.editProfileForm.value})
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);
        });
  }

  redirectToAdminPage(): void{
    this.router.navigate(['/admin']);
  }
}
