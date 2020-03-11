import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import EqualTextValidator from '../equal.validator';
import {RoleService} from '../../roles/role.service';
import {Observable, Subscription} from 'rxjs';
import {Role} from '../../roles/role';

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

  roles: Role[];
  sub: Subscription;
  constructor(private rs: RoleService) {
  }

  ngOnInit(): void {
    this.sub = this.rs.getRoles().subscribe(roles => {
      this.roles = roles;
      if (this.roles.length > 0) {
        this.user.role = this.roles[0];
      }
    });
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
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
