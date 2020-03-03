import {Injectable} from '@angular/core';
import {User} from '../users/user';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[];

  constructor() {
    this.users = [
      {username: 'lbilde', password: '123', email: 'cheese@namnam.dk'},
      {username: 'lbilde22', password: '123', email: 'cheese22@namnam22.dk'},
      {username: 'ilikechokolate', password: '123', email: 'cheese33@namnam33.dk'},

    ];
  }

  login(username, password): Observable<User> {
    const userAccepted = this.users
      .filter(x => x.username === username)
      .filter(y => y.password === password);
    if (userAccepted && userAccepted.length === 1) {
      localStorage.setItem('currentUser', JSON.stringify({token: 'jwt will come later', username: userAccepted[0].username}));
      return of(userAccepted[0]);
      // return new Promise(resolve => {
      //   setTimeout(() => resolve(userAccepted[0]), 4000);
      // });
    } else {
      return of(null);
    }
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut() {
    return localStorage.removeItem('currentUser');
  }
}
