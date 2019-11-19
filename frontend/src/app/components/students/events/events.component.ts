import {
  Component,
  OnInit
} from '@angular/core';
import {
  EventService
} from './../../../shared/events/event.service'
import {
  Event
} from './../../../shared/events/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.refreshEvents();
  }

  refreshEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.eventService.events = res as Event[];
      console.log(this.eventService.events)
    })
  }
}