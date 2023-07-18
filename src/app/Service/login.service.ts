// login-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationResponse} from "../Model/authentication-response";
import {AuthenticationRequest} from "../Model/authentication-request";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    const loginUrl = 'http://localhost:8080/api/v1/auth/authenticate';
    return this.http.post<AuthenticationResponse>(loginUrl, request);
  }
}
