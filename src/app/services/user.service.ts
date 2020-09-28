import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { map } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  updateUser(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/v1/user/update`, user)
      // tslint:disable-next-line:no-shadowed-variable
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  getUser(id: string): Observable<any> {
    return this.http.get<User>(`http://localhost:3000/api/v1/user/${id}`)
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        return user;
      }));
  }
}
