import { EventService } from "./../../../shared/events/event.service";
import { AchievementsService } from "./../../../shared/achievements/achievements.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NameService } from "./../../../shared/name/name.service";
import { CookieService } from "ngx-cookie-service";
import * as jwt_decode from "jwt-decode";
import { Component, OnInit, Inject } from "@angular/core";
import { SearchService } from "../../../shared/search/search.service";
import { AuthService } from "./../../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { Search } from "../../../shared/search/search.model";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Achievements } from "src/app/shared/achievements/achievements.model";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";
import { school } from "../signup/signup.component";
export var decoded: any;
export var File;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  profileUrlExists = false;
  interestlist: any;
  name:any
  imageToShow: any;
  uploadedFiles: Array<File>;
  username: any;
  ipAddress: string;
  file: any;
  path: "";
  ach_list: any;
  School = school;
  evn_list: any;
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,

    private auth: AuthService,
    private router: Router,
    private data: SearchService,
    private uname: NameService,
    public SearchService: SearchService,
    private http: HttpClient,
    private ach: AchievementsService,
    private eventService: EventService
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var email = decodedtoken["email"];
    this.getProfileName()
    this.refreshAchievements();
    this.getInterests();
    this.getEvents();
  }
  refreshAchievements() {
    this.ach.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      console.log(this.ach_list);
    });
  }

  getEvents() {
    this.eventService.getFollowEvents().subscribe(
      res => {
        console.log(res);
        this.evn_list = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getInterests() {
    return this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/interests").subscribe(res => {
      this.interestlist = res;
      console.log(this.interestlist);
    });
  }

  send() {
    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    File = (document.getElementById("file1") as HTMLInputElement).files;
    const frmData = new FormData();
    console.log(File[0]);
    console.log(File[0].name);
     this.name = File[0].name;
    frmData.append("img", File[0]);
    frmData.append("name", File[0].name);
    this.http
      .post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/uploadProfile", frmData,options)
      .subscribe(res => {
        console.log(res);
      });
  }

  getProfileName(){
    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    this.http.post('http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/getProfileName',options).subscribe(res=>{
      console.log(res)
      console.log('IMAGE TO SHOW')
      this.imageToShow=res['name']
      console.log(this.imageToShow)
    })
  }
  readSingleFile(e) {
    // const name = e[0].name;
    const name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getIP() {
    this.auth.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/api/ip", this.ipAddress);
      console.log("IP POSTED");
    });
  }
  ngOnInit() {
    console.log(this.School);
    var decodedtoken = jwt_decode(decoded);
    this.getIP();

    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Student") {
        this.username = decodedtoken["given_name"];
      }
      console.log(this.username);
    });
  }

  changeTab(){
    this.data.eventTab = 1;
  }

}
