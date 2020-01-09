import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../shared/events/event.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-eventfollow',
  templateUrl: './eventfollow.component.html',
  styleUrls: ['./eventfollow.component.css']
})
export class EventfollowComponent implements OnInit {
  results: any

  constructor(public eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents(){
    this.eventService.getFollowEvents().subscribe(
      res => {
        console.log(res)
        this.results = res;
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
