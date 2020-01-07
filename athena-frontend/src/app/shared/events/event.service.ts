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
    evnAdd2: "",
    Image:""
  };
  events: Event[];

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
    return this.http.get("https://backend-athena.herokuapp.com/events",options);
  }
  postEvents(events: Event) {
    console.log("Post Events method");
    console.log(events)
    return this.http.post("https://backend-athena.herokuapp.com/organizer-events", events);
  }

  getEventDetails(_id: Details ){
    console.log(_id)
    return this.http.post("https://backend-athena.herokuapp.com/click-on-events", _id)
  }

  getcategoryDetails() {
    return this.http.get("https://backend-athena.herokuapp.com/getCategoriesAll");
  }

  getSubCategory(id) {
    return this.http.get("https://backend-athena.herokuapp.com/getCategoriesId?catId="+id);
  }

  postUserInterest(userInterest) {

    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    console.log(userInterest)
    return this.http.post("https://backend-athena.herokuapp.com/addInterest", userInterest,options);
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
    return this.http.post("https://backend-athena.herokuapp.com/addInterestOrganizer", obj)
  }

  postFollow(_id: EventFollow){
    console.log(_id)
    return this.http.post("https://backend-athena.herokuapp.com/api/follow", _id);
  }

  getFollowEvents(){
    return this.http.get("https://backend-athena.herokuapp.com/api/getevents")
  }
}
