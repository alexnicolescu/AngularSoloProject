import {Component, Input, OnInit} from '@angular/core';
import {User} from '../users/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FirebaseAuth} from '@angular/fire';
import {AuthUser} from '../auth/login/authUser';
import UserCredential = firebase.auth.UserCredential;
import * as firebase from 'firebase';

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title: string;
  user: any;

  constructor(public loginValidationBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser();
    // console.log(this.user);
  }

  logout() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['/login']).then(() => {
        this.loginValidationBar.open('You are logged out', 'Ok', {
          duration: 3000
        });
      });
    });

  }

}
