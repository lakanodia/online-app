import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private signUpUrl = 'https://api.everrest.educata.dev/auth/sign_up';
  private signInUrl = 'https://api.everrest.educata.dev/auth/sign_in';

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<any> {
    return this.http.post(this.signUpUrl, userData);
  }

  signIn(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.signInUrl, credentials).pipe(
      map((response: any) => {
        // If sign-in successful, set isLoggedIn to true
        this.isLoggedIn = true;
        // Store token in localStorage or manage as needed
        localStorage.setItem('token', response.token);
        return response;
      }),
      catchError(error => {
        // If sign-in fails, set isLoggedIn to false
        this.isLoggedIn = false;
        return throwError(error);
      })
    );
  }

  // Method to check if user is logged in
  // getIsLoggedIn(): boolean {
  //   return this.isLoggedIn;
  // }


  getIsLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    console.log('IsLoggedIn:', isLoggedIn);
    return isLoggedIn;
  }
  getToken(): any {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  removeToken(): void {
    // Remove token from localStorage
    localStorage.removeItem('token');
  }
}
