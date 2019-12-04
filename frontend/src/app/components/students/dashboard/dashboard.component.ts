import { HttpClient } from '@angular/common/http';
import { decoded } from "./../../../auth/auth.service";
import { NameService } from "./../../../shared/name/name.service";
import { CookieService } from "ngx-cookie-service";

import { Component, OnInit } from "@angular/core";
import { DatasharingService } from "./../../../shared/datasharing.service";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { Search } from "./../../../shared/search.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  username: any;
  ipAddress:string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DatasharingService,
    private uname: NameService,
    public datasharingService: DatasharingService,
    private http:HttpClient
  ) {}
  
    
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getIP()
  {
      this.auth.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      this.http.post('http://localhost:3000/api/ip', this.ipAddress )
      console.log('IP POSTED')
    });
  }
  ngOnInit() {
    this.getIP();
    var d = decoded;
    this.data.currentName.subscribe((res: Response) => {
      if (decoded["role"] == "Student") {
        this.username = decoded["given_name"];
      }
      console.log(this.username);
    });
  }

  onSubmit(form: NgForm) {
    this.datasharingService.postSearch(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
        console.log("Error");
      }
    );
  }
}
