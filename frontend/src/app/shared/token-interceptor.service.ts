import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpHeaders} from '@angular/common/http'
import {AuthService} from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  public header: HttpHeaders
  constructor(private injector: Injector) { }


  intercept(req, next){

    let authService= this.injector.get(AuthService)


    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
          
    })
    return next.handle(tokenizedReq)
  }
}
