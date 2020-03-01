import {Component, OnInit} from '@angular/core';
import {User} from '../users/user';
import {Router} from '@angular/router';

@Component({
  selector: 'cp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  users: User[];
  loginError = null;

  constructor(private router: Router) {
    this.users = [
      {username: 'lbilde', password: '123', email: 'cheese@namnam.dk'},
      {username: 'lbilde22', password: '123', email: 'cheese22@namnam22.dk'},
      {username: 'ilikechokolate', password: '123', email: 'cheese33@namnam33.dk'},

    ];
  }

  login(user) {
    const userAccepted = this.users
      .filter(x => x.username === user.username)
      .filter(y => y.password === user.password);
    if (userAccepted && userAccepted.length === 1) {
      this.loginError = null;
      this.router.navigate(['/']).then(() => console.log('page changed'));
    } else {
      this.loginError = 'username or password were wrong ';
    }
  }

  ngOnInit(): void {
  }

}
