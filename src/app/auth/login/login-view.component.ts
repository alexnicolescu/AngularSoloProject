import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthUser} from './authUser';

@Component({
  selector: 'cp-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  user: AuthUser;
  @Input()
  signInError: string;
  @Output('login')
  tryLoginEmitter = new EventEmitter<AuthUser>();
  @Input()
  tryingToLogIn: boolean;
  tryLogin() {
    this.tryLoginEmitter.emit(this.user);
  }

  constructor() {
    this.user = new AuthUser();
  }

  ngOnInit(): void {
  }

}
