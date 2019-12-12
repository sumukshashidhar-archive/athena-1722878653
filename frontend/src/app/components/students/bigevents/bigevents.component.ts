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
  x: any = this.eventService.details1;
  evnName:any
  age:number
  description:any
  orgcontact:number
  orgname:string
  getEvents(){

  }
  constructor(public eventService: EventService) { }

  ngOnInit() {
    console.log(EventDetails)
    this.evnName=EventDetails["evnName"]
    this.age=EventDetails["evnTargetAge"]
    this.description=EventDetails["evnDescription"]
    this.orgcontact=EventDetails["evnOrganizerContact"]
    this.orgname=EventDetails["evnOrganizerName"]

  }


}
