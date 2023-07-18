// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { LoginService } from '../Service/login.service';
import { AuthenticationRequest } from '../Model/authentication-request';
import { AuthenticationResponse } from '../Model/authentication-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  pin: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    const request: AuthenticationRequest = {
      email: this.email,
      pin: this.pin
    };

    this.loginService.login(request).subscribe(
      (response: AuthenticationResponse) => {
        console.log('Login successful:', response);
        this.router.navigate(['/main']);
      },
      (error) => {
        console.error('Error while logging in:', error);
        this.router.navigate(['']);
      }
    );
  }
}
