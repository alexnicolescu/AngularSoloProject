import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FirebaseAuth} from '@angular/fire';
import {AuthUser} from '../auth/login/authUser';
import UserCredential = firebase.auth.UserCredential;
import * as firebase from 'firebase';

import {Subscription} from 'rxjs';
import {User} from 'firebase';

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit, OnDestroy {
  @Input()
  title: string;
  user: User;
  logoutSub: Subscription;
  currentUserSub: Subscription;

  constructor(public loginValidationBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser().subscribe(user => {
      this.user = user;
    });
    console.log(this.user);
  }

  logout() {
    this.logoutSub = this.authService.logOut().subscribe(() => {
      this.router.navigate(['/login']).then(() => {
        this.loginValidationBar.open('You are logged out', 'Ok', {
          duration: 3000
        });
      });
    });

  }

  ngOnDestroy() {
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
    if (this.logoutSub) {
      this.logoutSub.unsubscribe();
    }
  }

}
