import { decoded } from "./../../../auth/auth.service";
import { NameService } from "./../../../shared/name/name.service";
import { CookieService } from "ngx-cookie-service";

import { Component, OnInit } from "@angular/core";
import { DatasharingService } from "./../../../shared/datasharing.service";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  username: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DatasharingService,
    private uname: NameService
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  ngOnInit() {
    var d = decoded;
    this.data.currentName.subscribe((res: Response) => {
      if (decoded["role"] == "Student") {
        this.username = decoded["given_name"];
      }
      console.log(this.username);
    });
  }
}
