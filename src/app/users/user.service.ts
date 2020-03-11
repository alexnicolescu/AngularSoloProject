import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, ReplaySubject} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {FirebaseAuth} from '@angular/fire/firebase.app.module';
import {User} from './user';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  app;

  constructor(private af: AngularFireAuth, private ad: AngularFireDatabase) {
  }

  getUsers(): Observable<User[]> {
    return this.ad.list<User>('users').valueChanges();
  }

  deleteUser($key: string) {
    if ($key !== undefined) {
      this.ad.list('users').remove($key).then(user => {
        console.log('User successfully deleted');
      });
    }
  }

  getUser($key: string): Observable<User> {
    return this.ad.object<User>('users/' + $key).valueChanges();
  }

  createUser(user: User): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);
    firebase.auth().createUserWithEmailAndPassword(user.profile.email, user.password)
      .then(res => {
        this.ad.object(`users/${res.user.uid}`).set({
            profile: {
              email: user.profile.email || null,
              username: user.profile.username || null
            },
            role: {
              id: user.role.$key || null,
              name: user.role.name || null
            }
          }
        )
          .then(useri => {
            resultSubject.next(useri);
          })
          .catch(error => {
            resultSubject.error(error);
          });
      })
      .catch(error => {
        resultSubject.error(error);
      });
    return resultSubject;
  }

  updateUserProfile(user: User) {
    const resultSubject = new ReplaySubject(1);
    if (user !== undefined && user.$key !== undefined) {
      const dataToUpdate = {};
      dataToUpdate[`users/${user.$key}/profile/username`] = user.profile.username;
      dataToUpdate[`users/${user.$key}/profile/displayName`] = user.profile.displayName;
      this.ad.object('')
        .update(dataToUpdate)
        .then(() => {
          resultSubject.next(user);
        })
        .catch(err => {
          resultSubject.error(err);
        });
      return resultSubject;
    }
  }
}
