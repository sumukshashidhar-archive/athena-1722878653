import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../shared/events/event.service'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  events: any

  constructor(public eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getHomeEvents().subscribe(
      res => {
        console.log(res)
        this.events = res
      },
      err => {
        console.log(err)
      }
    )
  }
}
