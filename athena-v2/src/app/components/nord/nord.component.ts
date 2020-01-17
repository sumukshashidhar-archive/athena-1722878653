import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/shared/events/event.service';

@Component({
  selector: 'app-nord',
  templateUrl: './nord.component.html',
  styleUrls: ['./nord.component.css']
})
export class NordComponent implements OnInit {
  events: any

  constructor(private http: HttpClient, public eventService: EventService) { }

  ngOnInit() {
    this.refreshEvents();
  }

  refreshEvents(){
    this.http.get("http://localhost:3000/getnord").subscribe(
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
