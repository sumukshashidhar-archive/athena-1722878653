import { Event } from './../../../shared/events/event';
import { Component, OnInit } from "@angular/core";
import { DatasharingService } from 'src/app/shared/search/datasharing.service';
import * as jwt_decode from 'jwt-decode';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { EventService } from "./../../../shared/events/event.service";
export var decoded:any
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: "app-events-organizer",
  templateUrl: "./events-organizer.component.html",
  styleUrls: ["./events-organizer.component.css"]
})
export class EventsOrganizerComponent implements OnInit {
  returnedEvents: any;
  maxDate: string;
  newDate: string;
  username: any;
  match=false
  arr:any

  constructor(public eventService: EventService, private router: Router, private data: DatasharingService) {
    decoded= localStorage.getItem('access_token');
  }

  ngOnInit() {
    this.refreshEvents();
    this.maxDateSet()
  }
  onSubmit(form: NgForm) {
    form.value['evnLocation'] = form.value['evnAdd1'] + '\n' + form.value['evnAdd2']
    this.eventService.postEvents(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
      }
    );

    
   
  }

  maxDateSet(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var newmm; 
    var newdd;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        newdd = '0' + dd.toString();
    }
    else {
      newdd = dd.toString();
    }
    if (mm < 10) {
        newmm = '0' + mm.toString(mm);
    }
    else {
      newmm = mm.toString();
    }
    this.maxDate = yyyy + '-' + newmm + '-' + newdd;

  }



  refreshEvents() {
    var decodedtoken= jwt_decode(decoded)
    console.log(decoded)
    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Org") {
        this.username = decodedtoken["name"];
      }
      console.log(this.username);
    });
    this.eventService.getEvents().subscribe(res => {
      this.eventService.events = res as Event[];
    
      console.log(this.eventService.events);
      for ( var index = 0; index < this.eventService.events.length; index++) { 
       
       if  (this.eventService.events[index]['evnOrganizerName']== this.username){
          this.match=true
          this.arr=this.eventService.events[index]
          
       }
      }
    });
  }

}
