import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import * as jwt_decode from 'jwt-decode';
import { DatasharingService } from "src/app/shared/search/datasharing.service";
import { NameService } from "src/app/shared/name/name.service";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
export var decoded :any 
@Component({
  selector: "app-organizer-dashboard",
  templateUrl: "./organizer-dashboard.component.html",
  styleUrls: ["./organizer-dashboard.component.css"]
})
export class OrganizerDashboardComponent implements OnInit {
  username: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DatasharingService,
    private uname: NameService
  ) {
    decoded= localStorage.getItem('access_token');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    var decodedtoken= jwt_decode(decoded)
    console.log(decoded)
    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Org") {
        this.username = decodedtoken["name"];
      }
      console.log(this.username);
    });
  }
}
