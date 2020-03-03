import {Component, Input, OnInit} from '@angular/core';
import {User} from '../users/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title: string;
  user: User;

  constructor(public loginValidationBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
    this.user = authService.currentUser();
  }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login']).then(() => {
      this.loginValidationBar.open('You are logged out', 'Ok', {
        duration: 3000
      });
    });
  }

}
