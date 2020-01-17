import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from './../../../shared/events/event.service';

@Component({
  selector: 'app-eventsnord',
  templateUrl: './eventsnord.component.html',
  styleUrls: ['./eventsnord.component.css']
})
export class EventsnordComponent implements OnInit {
  events: any

  constructor(private http: HttpClient, public eventService: EventService) { }

  ngOnInit() {
    this.refreshEvents();
  }

  refreshEvents(){
    this.http.get("http://localhost:3000/eventsdeep").subscribe(
      res => {
        var x = this.eventService.changeDate(res)
        this.events = x
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

}
