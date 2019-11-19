import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';


import {
  Event
} from './event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  selectedEvent: Event = {
    evnLocation: '',
    evnName: '',
    evnOrganizerContact: '',
    evnDate: '',
    evnOrganizerPage: '',
  };
  events: Event[];

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get('http://localhost:3000/events');
  }

  postEvents(events: Event) {
    console.log('Post Events method')
    return this.http.post('http://localhost:3000/organizer-events', events)
  }
}