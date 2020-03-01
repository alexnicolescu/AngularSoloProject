import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../auth.service';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginError = null;
  request: Subscription;

  constructor(public loginValidationBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {

  }

  login(user) {
    if(this.request){
      this.request.unsubscribe();
    }
    this.request = this.authService
      .login(user.username, user.password)
      .pipe(delay(5000))
      .subscribe(lUser => {
        if (lUser) {
          this.loginError = null;
          this.router.navigate(['/']).then(() => this.loginValidationBar.open('You are logged in', 'Ok', {duration: 3000}));
        } else {
          this.loginError = 'username or password were wrong ';
        }
      });
  }

  ngOnInit(): void {
  }

}
