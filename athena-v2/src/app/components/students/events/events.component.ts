import { AuthService } from './../../../shared/auth/auth.service'
import { Component, OnInit } from "@angular/core";
import { EventService } from "./../../../shared/events/event.service";
import { Event } from "./../../../shared/events/event";
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
  selected = new FormControl(0);

  constructor(public data: SearchService, public eventService: EventService, private router: Router,private auth:AuthService, private http:HttpClient) {
    this.decoded = localStorage.getItem("access_token");
  }

  
  ngOnInit() {
    this.refreshEvents();
    this.tabChange()
    this.getEvents();
  }

  refreshEvents() {
    this.eventService.getEvents().subscribe(res => {
      this.eventService.events = res;
      this.showSpinner = false;
      console.log(this.eventService.events);
    });
  }

  tabChange(){
    this.selected.setValue(this.data.eventTab);
  }

  getEvents(){
    this.eventService.getFollowEvents().subscribe(
      res => {
        console.log(res)
        this.results = res;
      },
      err => {
        console.log(err)
      }
    )
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
