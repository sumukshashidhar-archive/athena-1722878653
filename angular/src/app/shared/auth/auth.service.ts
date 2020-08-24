import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../user/user.model';
import * as jwt_decode from 'jwt-decode';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
var Token:JSON;
export var decoded
var logout:Boolean;
logout=true
@Injectable()
export class  AuthService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient, private router:Router) { }


  login(user: User): Observable<boolean> {
    console.log('Reached login method')
    return this.http.post<JSON>('https://backend-athena.herokuapp.com/login',user)
      .pipe(
        map(res => {
          console.log(`RESPONSE IS ${res}`)
          this.localStorage.setItem('access_token', JSON.stringify(res))
          var decodedT = this.localStorage.getItem('access_token');
           decoded = jwt_decode(decodedT);
          console.log(decoded);
          this.posttoken(res)
          console.log('Printed')
          return true;
        })
      );
  }
    posttoken(token:JSON) {
      console.log('Entered posttoken method')
      console.log(token)
      this.http.post('https://backend-athena.herokuapp.com/dashboard', token )

    }

  logout() {
    var token=localStorage.getItem('access-token')
    console.log('LOGGING OUT')
    this.http.post('https://backend-athena.herokuapp.com/logout', token).subscribe(res=>{
      console.log(res)
    })
    console.log(logout)
    this.localStorage.removeItem('access_token');
    this.router.navigate(['/login']);

  }
  getToken(){
    return this.localStorage.getItem('access_token')
  }
   loggedIn(){
    return !! this.localStorage.getItem('access_token') ;
  }
}
