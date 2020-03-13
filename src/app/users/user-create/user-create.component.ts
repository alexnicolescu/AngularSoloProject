import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import EqualTextValidator from '../equal.validator';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'cp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  @Input()
  creatingUser: boolean;
  @Input()
  user: User;
  @Input()
  error: string;
  @Output()
  creatingUserEvent = new EventEmitter<boolean>();

  @Output()
  createUserEvent = new EventEmitter<User>();

  sub: Subscription;
  constructor() {
  }

  ngOnInit(): void {
  }

  creatingNewUser(value) {
    this.creatingUser = value;
    this.creatingUserEvent.emit(value);
  }
  onSubmit(userForm) {
    if (userForm.form.valid) {
      this.createUserEvent.emit(this.user);
    }
  }
  verifyPassword(pass: string,
                 repeatPass: string) {
    return pass === repeatPass;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
