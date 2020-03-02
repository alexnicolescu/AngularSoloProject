import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginViewComponent } from './auth/login/login-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from './auth/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    TopToolbarComponent,
    HomeComponent,
    LoginComponent,
    LoginViewComponent
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
        MatProgressSpinnerModule
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
