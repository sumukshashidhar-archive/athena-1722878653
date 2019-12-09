import { Component, OnInit } from "@angular/core";
import { EventService } from "./../../../shared/events/event.service";
import { Event } from "./../../../shared/events/event";

import { LoadingComponent } from "./../../loading/loading.component";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  showSpinner: boolean = true;

  constructor(private eventService: EventService) {}

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

  sendDetails(_id: string){
    this.eventService.getEventDetails(_id).subscribe(
      res => {
        console.log(res)
        this.eventService.details = res
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
