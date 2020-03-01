import { Injectable } from '@angular/core';
import {User} from '../users/user';
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
  login(username, password): User {
    const userAccepted = this.users
      .filter(x => x.username === username)
      .filter(y => y.password === password);
    if (userAccepted && userAccepted.length === 1) {
        return userAccepted[0];
    } else {
    return null;
    }
  }
}
