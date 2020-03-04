import {Injectable} from '@angular/core';
import {User} from '../users/user';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuth} from '@angular/fire';
import { from } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private af: AngularFireAuth) {
  }

  login(email, password): Observable<UserCredential> {
  const promise = this.af.auth.signInWithEmailAndPassword(
    email,
    password
  );
  return from(promise);
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut() {
    return localStorage.removeItem('currentUser');
  }
}
