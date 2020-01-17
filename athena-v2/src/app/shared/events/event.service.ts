import { Injectable, Inject } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { EventFollow } from './eventfollow.model'

import { Event } from "./event.model";
import { Details } from './details.model';
import { LOCAL_STORAGE } from '@ng-toolkit/universal'

@Injectable({
  providedIn: "root"
})
export class EventService {
  selectedEvent: Event = {
    evnPincode: 0,
    evnName: "",
    evnOrganizerContact: 0,
    evnDate1: null,
    evnDate2: null,
    evnOrganizerPage: "",
    evnTargetAge: 0,
    evnDescription: "",
    evnInterests: "",
    evnAdd1: "",
    evnAdd2: "",
    evnCity: "",
    Image:""  
  };

  events: any;

  details: Details = {
    _id: ""
  }

  id: EventFollow = {
    id: ""
  }

  details1: any;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {}

  getEvents() {
    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    console.log("Events")
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

  postEventInterest(eventInterest, eventId){
    const token = this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    console.log(eventInterest)
    console.log(eventId)
    const obj = {
      eventId: eventId,
      options: options,
      eventInterest: eventInterest
    }
    console.log(obj)
    return this.http.post("http://localhost:3000/addInterestOrganizer", obj)
  }

  postFollow(_id: EventFollow){
    console.log(_id)
    return this.http.post("http://localhost:3000/api/follow", _id);
  }

  getFollowEvents(){
    return this.http.get("http://localhost:3000/api/getevents")
  }

  getHomeEvents(){
    return this.http.get("http://localhost:3000/api/getrecent")
  }

  getOrganizerEvents(){
    return this.http.get("http://localhost:3000/api/retorgevents")
  }

  changeDate(arr){
    for (let i = 0; i<arr.length; i++){
      arr[i]['evnDate1'] = this.convert(arr[i]['evnDate1'])
      arr[i]['evnDate2'] = this.convert(arr[i]['evnDate2'])
    }
    return arr;
  }

  convert(date1){
    var s = new Date(date1).toLocaleDateString("en-US")
    return s;
  }
}
