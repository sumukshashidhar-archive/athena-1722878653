import { Event } from './../../../shared/events/event';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/events/event.service';
import { DatasharingService } from 'src/app/shared/search/datasharing.service';
import * as jwt_decode from 'jwt-decode';
export var decoded :any 
@Component({
  selector: 'app-yourevents',
  templateUrl: './yourevents.component.html',
  styleUrls: ['./yourevents.component.css']
})
export class YoureventsComponent implements OnInit {
  username: any;
  match=false
  arr:any
  constructor(public eventService: EventService, private data: DatasharingService,) {
    decoded= localStorage.getItem('access_token');
  }

  ngOnInit() {
    this.refreshEvents();
   
  }

  refreshEvents() {
    var decodedtoken= jwt_decode(decoded)
    console.log(decoded)
    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Org") {
        this.username = decodedtoken["name"];
      }
      console.log(this.username);
    });
    this.eventService.getEvents().subscribe(res => {
      this.eventService.events = res as Event[];
    
      console.log(this.eventService.events);
      for ( var index = 0; index < this.eventService.events.length; index++) { 
       
       if  (this.eventService.events[index]['evnOrganizerName']== this.username){
          this.match=true
          this.arr=this.eventService.events[index]
          
       }
      }
    });
  }

}
