import { Component, OnInit } from "@angular/core";
import { Event } from "../../shared/events/event";
import { EventService } from "../../shared/events/event.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  opened = false;
  Events: any = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    console.log("we are in home-page.component.ts", this.Events);
    this.setEvents();
    console.log("After: ", this.Events);
  }
  
  setEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      console.log(" data before: ", data);
      this.Events = data;
    });
    console.log("This is from JSON: ", this.Events);
  }
}
