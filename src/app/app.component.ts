import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'online-app';

  constructor(private authService: AuthService, private router: Router){

  }


  signOut(): void {
    // Remove token from localStorage
    this.authService.removeToken();
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
