import { AuthService } from './../../../shared/auth/auth.service'
import { EventDetails } from './../events/events.component';
import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../shared/events/event.service'
import { ThrowStmt } from '@angular/compiler';
import { subscribeOn } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bigevents',
  templateUrl: './bigevents.component.html',
  styleUrls: ['./bigevents.component.css']
})
export class BigeventsComponent implements OnInit {
  x: any =  this.eventService.details1;
  
  constructor(public eventService: EventService,private auth:AuthService) { }

  ngOnInit() {
    console.log(this.x)
  }
  logout(){
    this.auth.logout()
  }

  sendDetails(form: NgForm, _id: string) {
    form.value['_id'] = _id;
    console.log(form.value);
    this.eventService.postFollow(form.value).subscribe(
      res => {
        console.log(res)
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
