import { school } from './../../students/signup/signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  school:any
  Name:any
  bio: any;
  file:any;
  username: any;
  imageToShow: any;
  interestlist: any;
  evn_list:any
  id:any
  Rank:any
  img:any
  desc:any
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    public achService: AchievementsService,
    private eventService:EventService,
    public _snackBar:MatSnackBar
  ) {
    this.decoded = localStorage.getItem("access_token");

  }



  ngOnInit() {
    var decodedtoken = jwt_decode(this.decoded);
    if (decodedtoken["role"] == "Student") {
      this.username = decodedtoken["given_name"];
    this.id=decodedtoken['usrid']
this.getUserDetails(this.id)
this.getEvents();

    }
    console.log(this.decoded);

  }
  DoIt(id:any){
    console.log(id)
    for(var i=0;i<this.ach_list.length;i++){
      if(this.ach_list[i]._id==id){
       this.desc=this.ach_list[i].Description
       this.img=this.ach_list[i].Image
       console.log(this.desc)
       console.log(this.img)
       this.Rank=this.ach_list[i].achRank
       this.Name=this.ach_list[i].Name

      }
    }

  }
  send() {
    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    var File = (document.getElementById("file1") as HTMLInputElement).files;
    if(File[0].size/1024000<2.1){
      const frmData = new FormData();
      console.log(File[0]);
      console.log(File[0].name);
      frmData.append("img", File[0]);
      frmData.append("name", File[0].name);
      var file=File[0].name
      this.http
        .post("https://backend-athena.herokuapp.com/uploadProfile",frmData)
        .subscribe(res => {
          console.log(res);
        }  ,err=>{
          if(err.status==200){
            this.openSnackBar("Successfully Updated","Close")
            location.reload()
          }
          else{
            this.openSnackBar("Error while updating","Close")
          }
        });
    }
    else{
      this.openSnackBar("File is too big. Try again with a smaller file", "Close");
    }

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  readSingleFile(e) {
    const name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getUserDetails(id:any){
    this.http.post('https://backend-athena.herokuapp.com/getUserInfo',{id}).subscribe(res=>{
      console.log(res)
      this.interestlist=res['obj']['Interests']
      this.ach_list=res['obj']['Achievement']
      this.bio=res['obj']['Bio']
      this.imageToShow=res['dp']
      this.school=res['obj']['studentSchool']
      console.log(this.school)
    })
  }
  thisAch(id:any){
    console.log(id)
    this.DoIt(id);
  }
  getEvents(){
    this.eventService.getFollowEvents().subscribe(
      res => {
       this.evn_list=res
      },
      err => {
        console.log(err)
      }
    )
  }

}
