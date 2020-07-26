
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.getItem('access_token')) {
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