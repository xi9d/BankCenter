import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerDetails} from '../classes/customer-details';
import { CustomerDetailsService } from '../services/customer-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private customerDetailsService: CustomerDetailsService, private router: Router) { }

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      confirm_pin: new FormControl('', Validators.required),
    });
  }

  confirmForm() {
    let pin = this.form.get('pin').value;
    let confirmPin = this.form.get('confirm_pin').value;

    if (pin === confirmPin) {
      this.customerForm(); // Call customerForm if passwords match
    } else {
      alert("Password and confirm password do not match.");
    }
  }

  customerForm() {
    const request: CustomerDetails = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      pin: this.form.get('pin').value
    };

    this.customerDetailsService.registerCustomer(request).subscribe(
      response => {
        let result = response.json();

        if (result > 0) {
          this.router.navigate(['/login']);
        } else {
          alert("Error occurred while registering User. Please try again later.");
        }
      },
      error => {
        alert("Error occurred while registering User. Please try again later.");
      }
    );
  }
}
