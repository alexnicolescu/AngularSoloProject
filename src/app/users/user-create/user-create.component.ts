import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'cp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  @Output()
  creatingUserEvent = new EventEmitter<boolean>();
  creatingUser: boolean;
  @Output()
  createUserEvent = new EventEmitter<User>();
  user: User;

  constructor() {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  creatingNewUser(value) {
    this.creatingUser = value;
    this.creatingUserEvent.emit(value);
  }

  onSubmit() {
    this.createUserEvent.emit(this.user);
    this.creatingUser = false;
    this.clear();
  }

  clear() {
    this.user = new User();
  }

}
