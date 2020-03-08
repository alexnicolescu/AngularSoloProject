import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'cp-users-view',
  templateUrl: './users-view.component.html',
})
export class UsersViewComponent implements OnInit {
  users: Observable<User[]>;
  creatingUser: boolean;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
  creatingUserEvent(value) {
    this.creatingUser = value;
  }

}
