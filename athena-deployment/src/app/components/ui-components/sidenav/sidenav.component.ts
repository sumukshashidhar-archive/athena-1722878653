import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { HttpHeaders, HttpClient } from '@angular/common/http';

export var decoded: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  profileUrlExists=false
  imageToShow:any
  username: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http:HttpClient
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var email = decodedtoken["email"];
    this.getProfileName()
   }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getProfileName(){
    const token=localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    this.http.post('http://ec2-15-206-148-32.ap-south-1.compute.amazonaws.com:3000/getProfileName',options).subscribe(res=>{
      console.log(res)
      console.log('IMAGE TO SHOW')
      this.imageToShow=res['name']
      console.log(this.imageToShow)
    })
  }
}
