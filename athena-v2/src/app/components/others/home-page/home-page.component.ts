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
  showCarousel: boolean;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents()
  }

  getEvents(){
    this.eventService.getHomeEvents().subscribe(
      res => {
        console.log(res)
        this.events = res
        for (let i = 0 ; i < 3 ; i++) {
          if (this.events[i] == null){
            this.showCarousel = false;
            break;
          }
          else {
            this.showCarousel = true
          }
        }
      },
      err => {
        console.log(err)
        this.showCarousel = false;
      }
    )
  }
}
