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
    return this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/events",options);
  }
  postEvents(events: Event) {
    console.log("Post Events method");
    console.log(events)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/organizer-events", events);
  }

  getEventDetails(_id: Details ){
    console.log(_id)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/click-on-events", _id)
  }

  getcategoryDetails() {
    return this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/getCategoriesAll");
  }

  getSubCategory(id) {
    return this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/getCategoriesId?catId="+id);
  }

  postUserInterest(userInterest) {

    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    console.log(userInterest)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/addInterest", userInterest,options);
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
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/addInterestOrganizer", obj)
  }

  postFollow(_id: EventFollow){
    console.log(_id)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/api/follow", _id);
  }

  getFollowEvents(){
    return this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/api/getevents")
  }
}
