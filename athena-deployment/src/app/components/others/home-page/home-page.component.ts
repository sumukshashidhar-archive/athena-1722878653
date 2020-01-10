import { Component, OnInit } from "@angular/core";
import { EventService } from "../../../shared/events/event.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  opened = false;
  events: any = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getHomeEvents().subscribe(
      res => {
        console.log(res)
        this.events = res;
      },
      err => {
        console.log(err)
      }
    )
  }
  
}
