import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router'

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
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

}
