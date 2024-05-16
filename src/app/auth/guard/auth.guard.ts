import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard checking authentication');
    const isAuthenticated = this.authService.getIsLoggedIn();
    console.log('Is authenticated:', isAuthenticated);
    if (isAuthenticated) {
      return true;
    } else {
      console.log('Redirecting to login');
      return this.router.parseUrl('/login');
    }
  }
}
