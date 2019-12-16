import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { EventService } from "./../../../shared/events/event.service";

@Component({
  selector: "app-events-organizer",
  templateUrl: "./events-organizer.component.html",
  styleUrls: ["./events-organizer.component.css"]
})
export class EventsOrganizerComponent implements OnInit {
  returnedEvents: any;
  maxDate: string;
  newDate: string;

  constructor(public eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.maxDateSet()
  }
  onSubmit(form: NgForm) {
    form.value['evnLocation'] = form.value['evnAdd1'] + '\n' + form.value['evnAdd2']
    this.eventService.postEvents(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
      }
    );
  }

  maxDateSet(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var newmm; 
    var newdd;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        newdd = '0' + dd.toString();
    }
    else {
      newdd = dd.toString();
    }
    if (mm < 10) {
        newmm = '0' + mm.toString(mm);
    }
    else {
      newmm = mm.toString();
    }
    this.maxDate = yyyy + '-' + newmm + '-' + newdd;

  }


}
