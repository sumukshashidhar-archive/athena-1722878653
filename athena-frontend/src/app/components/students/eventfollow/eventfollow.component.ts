import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../shared/events/event.service'

@Component({
  selector: 'app-eventfollow',
  templateUrl: './eventfollow.component.html',
  styleUrls: ['./eventfollow.component.css']
})
export class EventfollowComponent implements OnInit {
  results: any

  constructor(public eventService: EventService) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents(){
    this.eventService.getFollowEvents().subscribe(
      res => {
        this.results = res;
      },
      err => {
        console.log(err)
      }
    )
  }

}
