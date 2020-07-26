import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { DatasharingService } from "src/app/shared/datasharing.service";
import { NameService } from "src/app/shared/name/name.service";
import { AuthService, decoded } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

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
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    this.data.currentName.subscribe((res: Response) => {
      if (decoded["role"] == "Org") {
        this.username = decoded["name"];
      }
      console.log(this.username);
    });
  }
}
