import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  constructor(private http: HttpClient) { }

  signup(firstName: string, lastName: string, email: string, pin: string): Observable<any> {
    const apiUrl = 'http://localhost:8080/api/v1/auth/register';

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      pin: pin
    };

    return this.http.post(apiUrl, data);
  }
}
