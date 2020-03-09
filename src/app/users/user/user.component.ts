import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';


@Component({
  selector: 'cp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: User;
  @Output()
  deleteUserEvent = new EventEmitter<string>();
  validateDelete: boolean;
  constructor() {
  }

  ngOnInit(): void {
  }

  deleteValidation(value: boolean) {
    this.validateDelete = value;
  }
  delete() {
    this.deleteUserEvent.emit(this.user.$key);
    this.validateDelete = false;
  }

}
