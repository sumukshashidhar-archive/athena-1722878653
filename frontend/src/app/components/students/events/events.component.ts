import { Component, OnInit } from "@angular/core";
import { EventService } from "./../../../shared/events/event.service";
import { Event } from "./../../../shared/events/event";

import { LoadingComponent } from "./../../loading/loading.component";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
export var EventDetails;
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  showSpinner: boolean = true;
  x: string;

  constructor(public eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.refreshEvents();
  }

  refreshEvents() {
    this.eventService.getEvents().subscribe(res => {
      this.eventService.events = res as Event[];
      this.showSpinner = false;
      console.log(this.eventService.events);
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
