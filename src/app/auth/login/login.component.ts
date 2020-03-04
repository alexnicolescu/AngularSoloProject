import {Component, OnDestroy, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../auth.service';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AuthUser} from './authUser';

@Component({
  selector: 'cp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginError = null;
  request: Subscription;
  tryingToLogIn: boolean;

  constructor(public loginValidationBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
    this.authService.logOut();
  }

  login(user: AuthUser) {
    this.tryingToLogIn = true;
    if (this.request) {
      this.request.unsubscribe();
    }
    this.request = this.authService
      .login(user.email, user.password)
      .pipe(delay(5000))
      .subscribe(lUser => {
          if (lUser) {
            this.loginError = null;
            this.router.navigate(['/']).then(() => this.loginValidationBar.open('You are logged in', 'Ok', {duration: 3000}));
          } else {
            this.loginError = 'username or password were wrong ';
          }
          this.tryingToLogIn = false;
        },
        (err) => {
          console.error(err);
          this.loginError = 'An error occured during login, see error in console';
          this.tryingToLogIn = false;
        },
        () => {
          console.log('Done!');
          this.tryingToLogIn = false;
        }
      )
    ;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.request) {
      this.request.unsubscribe();
    }
  }

}
