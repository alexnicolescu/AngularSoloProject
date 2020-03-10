import {CanActivate, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {FirebaseAuth} from '@angular/fire';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    this.authService
      .isAuthenticated()
      .subscribe(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      });
    return true;
  }

}
