import { AuthService } from './../../../shared/auth/auth.service'
import { Component, OnInit } from "@angular/core";
import { EventService } from "./../../../shared/events/event.service";
import { Event } from "./../../../shared/events/event";
import * as jwt_decode from "jwt-decode";
import { LoadingComponent } from "./../../others/loading/loading.component";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
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
  profileUrlExists:any
  constructor(public eventService: EventService, private router: Router,private auth:AuthService, private http:HttpClient) {
    this.decoded = localStorage.getItem("access_token");
  }

  
  ngOnInit() {
    this.refreshEvents();
    this.postToIt();
    var decodedtoken = jwt_decode(this.decoded);
    console.log(decodedtoken)
    if (decodedtoken["role"] == "Student") {
      console.log(decodedtoken["given_name"])
      this.username = decodedtoken["given_name"];}
  }

  refreshEvents() {
    this.eventService.getEvents().subscribe(res => {
      this.eventService.events = res;
      this.showSpinner = false;
      console.log(this.eventService.events);
    });
  }

  logout() {
    this.auth.logout();
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
    // this.http.get('http://localhost:3000/imageUpload').subscribe(res=>{
    //   console.log(res)
    this.http
      .get("http://localhost:3000/imageUpload", { responseType: "blob" })
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
