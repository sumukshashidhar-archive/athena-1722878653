import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/user/user.model';
import * as jwt_decode from 'jwt-decode';
var Token:JSON;
export var decoded
var logout:Boolean;
logout=true
@Injectable()
export class  AuthService {
 
  constructor(private http: HttpClient, private router:Router) { }


  login(user: User): Observable<boolean> {
    console.log('Reached login method')
    return this.http.post<JSON>('http://localhost:3000/login',user)
      .pipe(
        map(res => {
          console.log(`RESPONSE IS ${res}`)
          localStorage.setItem('access_token', JSON.stringify(res))
          var decodedT = localStorage.getItem('access_token');
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
      this.http.post('http://localhost:3000/dashboard', token )
      
    }
    public getIPAddress()
    {
      return this.http.get("https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json");
    }
  logout() {
    this.http.post('http://localhost:3000/logout', logout)
    console.log(logout)
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    
  }
  getToken(){
    return localStorage.getItem('access_token')
  }
   loggedIn(){
    return !! localStorage.getItem('access_token') ;
  }
}