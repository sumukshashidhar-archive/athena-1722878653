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
  profileUrlExists = false;
  interestlist: any;
  evn_list:any
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    public achService: AchievementsService,
    private eventService:EventService
  ) {
    this.decoded = localStorage.getItem("access_token");
    this.getProfileName()
  }


  getInterersts() {
    return this.http.get("http://localhost:3000/interests").subscribe(res => {
      this.interestlist = res;
      console.log(this.interestlist);
    });
  }
  getEvents(){
    this.eventService.getFollowEvents().subscribe(
      res => {
        console.log(res)
        this.evn_list = res;
      },
      err => {
        console.log(err)
      }
    )
  }
  getProfileName(){
    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    this.http.post('http://localhost:3000/getProfileName',options).subscribe(res=>{
      console.log(res)
      console.log('IMAGE TO SHOW')
      this.imageToShow=res['name']
      console.log(this.imageToShow)
    })
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
      },
      false
    );
    this.profileUrlExists = true;
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getBio(email: String) {
    this.http.post("http://localhost:3000/bio", email).subscribe(res => {
      console.log("RESPONSE FOR BIO: ");
      console.log(res);
      this.bio = res;
    });
  }
  ngOnInit() {
    var decodedtoken = jwt_decode(this.decoded);
    if (decodedtoken["role"] == "Student") {
      this.username = decodedtoken["given_name"];
      var EMAIL = decodedtoken["email"];
      var BioInfo = this.getBio(EMAIL);
      console.log(BioInfo);
      console.log(EMAIL);
      this.postToIt();

    }
    console.log(this.decoded);
    this.getAch();
    this.getInterersts();
    this.getEvents();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getAch() {
    this.achService.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      console.log(this.ach_list);
    });
  }
}
