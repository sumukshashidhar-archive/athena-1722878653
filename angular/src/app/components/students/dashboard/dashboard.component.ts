import { EventService } from "./../../../shared/events/event.service";
import { AchievementsService } from "./../../../shared/achievements/achievements.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
import { MatSnackBar } from "@angular/material/snack-bar";
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
  showLoading: any = true;
  mydate:any
  month:any
  str:any
  imageToShow: any;
  uploadedFiles: Array<File>;
  username: any;
  months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  file: any;
  path: "";
  ach_list: any;
  evn_list: any;
  upcoming=[]
  day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  acadlist: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private data: SearchService,
    public SearchService: SearchService,
    private http: HttpClient,
    private ach: AchievementsService,
    private eventService: EventService,
    private _snackBar: MatSnackBar
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var id = decodedtoken["usrid"];
    if(decodedtoken["role"]!="Student"){
      router.navigate(['/orgdashboard'])
    }
    this.getUserDetails(id)
    this.getEvents()

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  getUserDetails(id:any){
    this.http.post('https://backend-athena.herokuapp.com/getUserInfo',{id}).subscribe(res=>{
      console.log(res)
      this.interestlist=res['obj']['Interests']
      this.ach_list=res['obj']['Achievement']
      this.acadlist=res['obj']['Academics']
    })
  }

  getEvents() {
    this.eventService.getFollowEvents().subscribe(
      res => {
        console.log(res);
        this.evn_list = res;
        var x=this.eventService.changeDate(res)
        this.evn_list=x
        for(var i=0;i<this.evn_list.length;i++){
        this.mydate = new Date(this.evn_list[i].evnDate1);
        var today= new Date()
        this.month = this.months[this.mydate.getMonth()];

        if(this.months[today.getMonth()+1]==this.month){
          console.log(this.evn_list[i])
          this.str = this.mydate.getDate()+' '+this.month + ' ' + this.mydate.getFullYear();
          this.evn_list[i]['Date']=this.str
          this.upcoming.push(this.evn_list[i])
          console.log(this.upcoming)
        }
        }
        this.showLoading = false
      },
      err => {
        console.log(err);
        this.showLoading = true
      }
    );
  }


  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    var decodedtoken = jwt_decode(decoded);

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
