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

  // createUser(user: User) {
  //   firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  //     .then(res => {
  //       this.ad.list('users').push({
  //           email: user.email,
  //           username: user.username,
  //           uid: res.user.uid,
  //         }
  //       );
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   // this.ad.list<User>('users').push({
  //   // });
  //   // })
  // }

  createUser(user: User): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);
    firebase.auth().createUserWithEmailAndPassword(user.profile.email, user.password)
      .then(res => {
        this.ad.object(`users/${res.user.uid}`).set({
            email: user.profile.email,
            username: user.profile.username,
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
}
