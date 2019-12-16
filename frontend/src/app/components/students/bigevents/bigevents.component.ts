import { EventDetails } from './../events/events.component';
import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../shared/events/event.service'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-bigevents',
  templateUrl: './bigevents.component.html',
  styleUrls: ['./bigevents.component.css']
})
export class BigeventsComponent implements OnInit {
  x: any =  this.eventService.details1;
  
  constructor(public eventService: EventService) { }

  ngOnInit() {
    console.log(this.x)
  }

}
