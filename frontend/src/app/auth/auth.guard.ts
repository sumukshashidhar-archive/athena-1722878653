
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      console.log('Token found')
      return true;
    }
    else{
      console.log('Token not found')
    this.router.navigate(['login']);
    return false;
  }
}
}