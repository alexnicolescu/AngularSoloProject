import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuth} from '@angular/fire';
import {from} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import Auth = firebase.auth.Auth;
import * as firebase from 'firebase';
import {first, map, switchMap, take, tap} from 'rxjs/operators';
import {AuthUser} from './login/authUser';

import {UserService} from '../users/user.service';
import {User} from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private af: AngularFireAuth, private userService: UserService) {
  }

  login(email, password): Observable<UserCredential> {
    const promise = this.af.auth.signInWithEmailAndPassword(
      email,
      password
    );
    this.isLoggedIn = true;
    return from(promise);
  }

  currentUser(): Observable<User> {
    return this.af.authState
      .pipe(switchMap(authState => {
        if (authState) {
          return this.userService.getUser(authState.uid);
        } else {
         return of(null);
        }
      }));
  }

  logOut(): Observable<void> {
    const promise = firebase.auth().signOut();
    this.isLoggedIn = false;
    return from(promise);
  }

  isAuthenticated(): Observable<boolean> {
    return this.af.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState));
  }
}
