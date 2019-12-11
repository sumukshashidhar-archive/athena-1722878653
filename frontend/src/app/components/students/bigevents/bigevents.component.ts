import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../shared/events/event.service'

@Component({
  selector: 'app-bigevents',
  templateUrl: './bigevents.component.html',
  styleUrls: ['./bigevents.component.css']
})
export class BigeventsComponent implements OnInit {
  x: any = this.eventService.details1;

  constructor(public eventService: EventService) { }

  ngOnInit() {
  }

}
