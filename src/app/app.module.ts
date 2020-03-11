import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {TopToolbarComponent} from './top-toolbar/top-toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginViewComponent} from './auth/login/login-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from './auth/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from './users/user.service';
import {AuthGuard} from './auth/auth-guard';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersListComponent } from './users/users-view/users-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserComponent } from './users/user/user.component';
import {AngularFireDatabase} from '@angular/fire/database';
import EqualTextValidator from './users/equal.validator';
import {RoleService} from './roles/role.service';
import {MatSelectModule} from '@angular/material/select';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDPJLVh95pbFV-lW1BmkMHyXC9Zcm5VC5A',
  authDomain: 'cp2rest-30c07.firebaseapp.com',
  databaseURL: 'https://cp2rest-30c07.firebaseio.com',
  projectId: 'cp2rest-30c07',
  storageBucket: 'cp2rest-30c07.appspot.com',
  messagingSenderId: '1040120994322',
  appId: '1:1040120994322:web:72cff1fa4a33e2698216cb',
  measurementId: 'G-VQMCSELPCJ'
};


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'users'
    , component: UsersViewComponent
    , canActivate: [AuthGuard]
    , data: {roles: ['educator', 'admin']} },
  {path: 'profile', component: UserProfileComponent},
  ];

@NgModule({
  declarations: [
    AppComponent,
    TopToolbarComponent,
    HomeComponent,
    LoginComponent,
    LoginViewComponent,
    UsersViewComponent,
    UsersListComponent,
    UserCreateComponent,
    UserComponent,
    EqualTextValidator,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FlexLayoutModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatSelectModule,
  ],
  providers: [AuthService,
    AngularFirestore,
    AngularFireAuth,
    UserService,
    AuthGuard,
    AngularFireDatabase,
    RoleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
