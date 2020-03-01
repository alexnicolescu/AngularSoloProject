import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../auth.service';

@Component({
  selector: 'cp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginError = null;

  constructor(public loginValidationBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {

  }

  login(user) {
    const loggedInUser = this.authService.login(user.username, user.password);
    if (loggedInUser) {
      this.loginError = null;
      this.router.navigate(['/']).then(() => this.loginValidationBar.open('You are logged in', 'Ok', {duration: 3000}));
    } else {
      this.loginError = 'username or password were wrong ';
    }
  }

  ngOnInit(): void {
  }

}
