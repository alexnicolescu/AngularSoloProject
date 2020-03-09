import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'cp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input()
  users: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  deleteUser($key) {
    this.userService.deleteUser($key);
  }
}
