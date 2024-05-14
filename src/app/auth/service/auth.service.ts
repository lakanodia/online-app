import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor() { }

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
