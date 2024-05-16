import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private signUpUrl = 'https://api.everrest.educata.dev/auth/sign_up';

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<any> {
    return this.http.post(this.signUpUrl, userData);
  }

  login(username: string, password: string): boolean {
    // You can implement your authentication logic here
    if (username === 'user' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
