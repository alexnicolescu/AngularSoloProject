import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Profile} from '../profile';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference} from '@angular/fire/storage';


@Component({
  selector: 'cp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  changingImage: boolean;
  user: User;
  error: string;
  ref: AngularFireStorageReference;

  constructor(private userService: UserService, private authService: AuthService, public updateValidationBar: MatSnackBar, private afStorage: AngularFireStorage) {
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
  changingImageClick() {
  this.changingImage = true;
  }
  saveNewImage() {
    this.changingImage = false;
  }
  upload(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    // this.task = this.ref.put(event.target.files[0]);
  }
}
