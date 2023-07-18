import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, ROUTES} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'main',
        component:MainComponent
      },
      {
        path:'login',
        component:LoginComponent
      }
    ])
  ],
  providers: [SignupComponent,LoginComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
