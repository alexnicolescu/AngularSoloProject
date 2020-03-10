import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {User} from '../user';


@Component({
  selector: 'cp-users-view',
  templateUrl: './users-view.component.html',
})
export class UsersViewComponent implements OnInit {
  users: Observable<User[]>;
  creatingUser: boolean;
  user: User;
  error: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = new User();
    this.users = this.userService.getUsers();
  }
  creatingUserEvent(value) {
    this.creatingUser = value;
  }
  createUser(user) {
    this.userService.createUser(user)
      .subscribe(useri => {
        this.creatingUser = false;
        this.error = null;
      },
        err => {
        this.error = err.message;
        });
  }

}
