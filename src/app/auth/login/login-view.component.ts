import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cp-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  @Input()
  user: any;
  @Input()
  signInError: string;
  @Output('login')
  tryLoginEmitter = new EventEmitter();
  @Input()
  tryingToLogIn: boolean;
  tryLogin() {
    this.tryLoginEmitter.emit(this.user);
  }

  constructor() {
    this.user = {};
  }

  ngOnInit(): void {
  }

}
