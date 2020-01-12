import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

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
    private router: Router
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var email = decodedtoken["email"];
   }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
