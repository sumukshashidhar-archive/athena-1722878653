import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from './../../../shared/events/event.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-eventsnord',
  templateUrl: './eventsnord.component.html',
  styleUrls: ['./eventsnord.component.css']
})
export class EventsnordComponent implements OnInit {
  events: any

  constructor(private http: HttpClient, public eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.refreshEvents();
  }

  refreshEvents(){
    this.http.get("https://backend-athena.herokuapp.com/eventsdeep").subscribe(
      res => {
        var x = this.eventService.changeDate(res)
        this.events = x
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  sendDetails(form: NgForm, _id: string) {
    form.value['_id'] = _id;
    console.log(form.value);
    this.eventService.getEventDetails(form.value).subscribe(
      res => {
        console.log(res)
        this.eventService.details1 = res;
        sessionStorage.setItem("evnDetails", JSON.stringify(res))
        console.log(this.eventService.details1)
        this.router.navigate(['/bigevents'])
      },
      err => {
        if (err.status === 422) {
          // this.serverErrormessage = err.error.join('<br/>');
          console.log(422);
        } else {
          // this.serverErrormessage = "Something went wrong"
          console.log("error");
        }
      }
    );
  }

}
