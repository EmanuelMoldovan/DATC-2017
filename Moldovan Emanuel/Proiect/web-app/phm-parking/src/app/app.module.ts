// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmailLoginComponent } from './components/login/email-login/email-login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { IstoricComponent } from './components/istoric/istoric.component';

// Services
import { AuthService } from './services/auth.service';
import { GlobalVariables } from './services/global-variables.service';
import { MessageService } from './services/message.service';
import { UsersService } from './services/users.service';
import { ParcariService } from './services/parcari.service';
import { DateParcariService } from './services/date-parcari.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { EditComponent } from './components/edit/edit.component';

// Pipes
import { StatusParcarePipe } from './pipes/status-parcare.pipe';
import { SenzorPipe } from './pipes/senzor.pipe';

export const firebaseConfig = {
  apiKey: "AIzaSyAN5qYTaPq0Hj_P19z7NIdiWuq2j4LAeZI",
    authDomain: "phmparking.firebaseapp.com",
    databaseURL: "https://phmparking.firebaseio.com/",
    projectId: "phmparking",
    storageBucket: "",
    messagingSenderId: "314579654874"
};

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'email-login', component: EmailLoginComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'parcare', component: EditComponent},
  {path: 'istoric', component: IstoricComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    EmailLoginComponent,
    RegisterComponent,
    ProfileComponent,
    SettingsComponent,
    EditComponent,
    StatusParcarePipe,
    IstoricComponent,
    SenzorPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAN5qYTaPq0Hj_P19z7NIdiWuq2j4LAeZI'
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    MessageService,
    UsersService,
    ParcariService,
    DateParcariService,
    GlobalVariables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
