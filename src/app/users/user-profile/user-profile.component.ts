import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Profile} from '../profile';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'cp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  error: string;
  constructor(private userService: UserService, private authService: AuthService, public updateValidationBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const sub = this.authService.currentUser().subscribe(user => {
      this.user = user;
      sub.unsubscribe();
    });
    this.user = new User();
  }

  onSubmit(userProfileForm) {
    if (userProfileForm.form.valid && this.user !== undefined) {
     const sub = this.userService.updateUserProfile(this.user).subscribe(user => {
          this.updateValidationBar.open('Your profile is update', 'Ok', {duration: 3000});
        },
        err => {
          this.error = err.message;
        } ,
        () => {
        sub.unsubscribe();
        });
    }

  }
}
