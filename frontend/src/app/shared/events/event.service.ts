import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { Event } from "./event";
import { Details } from './details.model'

@Injectable({
  providedIn: "root"
})
export class EventService {
  selectedEvent: Event = {
    evnPincode: "",
    evnName: "",
    evnOrganizerContact: "",
    evnDate1: "",
    evnDate2: "",
    evnOrganizerPage: "",
    evnTargetAge: 0,
    evnDescription: "",
    evnInterests: "",
    evnAdd1: "",
    evnAdd2: ""
  };
  events: Event[];

  details: Details = {
    _id: ""
  }

  details1: any;

  constructor(private http: HttpClient) {}

  getEvents() {
    const token=localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers: headers
    };
    return this.http.get("http://localhost:3000/events",options);
  }
  postEvents(events: Event) {
    console.log("Post Events method");
    console.log(events)
    return this.http.post("http://localhost:3000/organizer-events", events);
  }

  getEventDetails(_id: Details ){
    console.log(_id)
    return this.http.post("http://localhost:3000/click-on-events", _id)
  }
}
