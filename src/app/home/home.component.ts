import { Component, OnInit } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {UserService} from '../users/user.service';
import {User} from '../users/user';

@Component({
  selector: 'cp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toolbarTitle = 'CP2';
  users: Observable<User[]>;
  private usersCollection: AngularFirestoreCollection<User>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

}
