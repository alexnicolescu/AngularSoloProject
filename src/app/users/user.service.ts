import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {FirebaseAuth} from '@angular/fire/firebase.app.module';
import {User} from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFirestore, private ad: AngularFireDatabase) {
  }

  getUsers(): Observable<User[]> {
    return this.ad.list<User>('users').valueChanges();
  }
  deleteUser($key: string) {
    this.ad.list('users').remove($key).then(user => {
      console.log('User successfully deleted');
    });
  }
  createUser(user: User) {
    this.ad.list<User>('users').push(user);
  }
}
