import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanEnterLoginPageGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  /** Auth guard helper method, if the user is logged in, they will be redirected to the main page */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLoggedIn()) {
        this.router.navigate(['/main']);
        return false;
      } else {
        return true;
      }
  }
}
