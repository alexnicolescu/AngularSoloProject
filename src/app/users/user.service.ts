import { Injectable } from '@angular/core';
import {User} from './user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFirestore) { }
  getUsers(): Observable<User[]> {
    const usersCollection = this.af.collection<User>('users');
    return usersCollection.valueChanges();
  }
}
