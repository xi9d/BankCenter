import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { SignupServiceService } from '../Service/signup-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  pin: string = '';

  constructor(
    private signupService: SignupServiceService,
    private router: Router // Inject the Router
  ) {}

  onSignup(): void {
    this.signupService.signup(this.firstName, this.lastName, this.email, this.pin)
      .subscribe(
        (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']); // Navigate to the login page
        },
        (error) => {
          console.error('Error while signing up:', error);
        }
      );
  }
}
