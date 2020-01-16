import { EventService } from './../../../shared/events/event.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "../../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { Achievements } from "../../../shared/achievements/achievements.model";
import { AchievementsService } from "../../../shared/achievements/achievements.service";
import * as jwt_decode from "jwt-decode";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.css"]
})
export class UserprofileComponent implements OnInit {
  ach_list: any;
  decoded: any;
  bio: any;
  username: any;
  imageToShow: any;
  interestlist: any;
  evn_list:any
  id:any
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    public achService: AchievementsService,
    private eventService:EventService
  ) {
    this.decoded = localStorage.getItem("access_token");

  }



  ngOnInit() {
    var decodedtoken = jwt_decode(this.decoded);
    if (decodedtoken["role"] == "Student") {
      this.username = decodedtoken["given_name"];
    this.id=decodedtoken['usrid']
this.getUserDetails(this.id)

    }
    console.log(this.decoded);

  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getUserDetails(id:any){
    this.http.post('http://localhost:3000/getUserInfo',{id}).subscribe(res=>{
      console.log(res)
      this.interestlist=res['obj']['Interests']
      this.ach_list=res['obj']['Achievement']
      this.bio=res['obj']['Bio']
      this.imageToShow=res['dp']
    })
  }
  thisAch(id:any){
    console.log(id)
    return false;
  }

}
