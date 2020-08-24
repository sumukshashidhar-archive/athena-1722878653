import { AuthService } from './../../../shared/auth/auth.service'
import { Component, OnInit } from "@angular/core";
import { EventService } from "./../../../shared/events/event.service";
import { Event } from "./../../../shared/events/event.model";
import * as jwt_decode from "jwt-decode";
import { LoadingComponent } from "./../../others/loading/loading.component";
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { SearchService } from './../../../shared/search/search.service'
export var EventDetails;
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  showSpinner: boolean = true;
  x: string;
  username:string;
  decoded:any
  imageToShow:any;
  profileUrlExists:any;
  results: any;
  arrImage: any;
  selected = new FormControl(0);
  interestlist: any;

  constructor(public data: SearchService, public eventService: EventService, private router: Router,private auth:AuthService, private http: HttpClient) {
    this.decoded = localStorage.getItem("access_token");
  }


  ngOnInit() {
    this.refreshEvents();
    this.tabChange()
    this.getEvents();
   var  decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var id = decodedtoken["usrid"];
    this.getUserDetails(id)
  }
  getUserDetails(id:any){
    this.http.post('https://backend-athena.herokuapp.com/getUserInfo',{id}).subscribe(res=>{
      console.log(res)
      this.interestlist=res['obj']['Interests']
    })
  }


  refreshEvents() {
    this.eventService.getEvents().subscribe(
    res => {
      var x = this.eventService.changeDate(res)
      this.eventService.events = x;
      this.showSpinner = false;
      console.log(this.eventService.events);
    },
    err => {
      if(err.status==403){
        this.router.navigate(['/login'])
      }
    });
  }


  tabChange(){
    this.selected.setValue(this.data.eventTab);
  }

  getEvents(){
    this.eventService.getFollowEvents().subscribe(
      res => {
        var x = this.eventService.changeDate(res)
        console.log(res)
        this.results = x;
      },
      err => {
        console.log(err)
      }
    )
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

  postToIt() {
    // this.http.get('https://backend-athena.herokuapp.com/imageUpload').subscribe(res=>{
    //   console.log(res)
    this.http
      .get("https://backend-athena.herokuapp.com/imageUpload", { responseType: "blob" })
      .subscribe((response: Blob) => {
        console.log("response as blob");
        console.log(response);
        this.createImageFromBlob(response);
      });
  }

  sendDetails(form: NgForm, _id: string) {
    form.value['_id'] = _id;
    console.log(form.value);
    this.eventService.getEventDetails(form.value).subscribe(
      res => {
        console.log(res)
        this.eventService.details1 = res;
        sessionStorage.setItem("evnDetails", JSON.stringify(res))
        console.log(this.eventService.details1)
        this.router.navigate(['/bigevents'])
      },
      err => {
        if (err.status === 422) {
          // this.serverErrormessage = err.error.join('<br/>');
          console.log(422);
        } else {
          // this.serverErrormessage = "Something went wrong"
          console.log("error");
        }
      }
    );
  }
}
