import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { EventService } from './../../../shared/events/event.service'
import { NgForm, FormControl } from '@angular/forms'

@Component({
  selector: 'app-searchres2',
  templateUrl: './searchres2.component.html',
  styleUrls: ['./searchres2.component.css']
})
export class Searchres2Component implements OnInit {
  results: any = this.search.results;

  selected = new FormControl(0);

  constructor(private http: HttpClient, public search: SearchService, private router: Router, public eventService: EventService) { }

  ngOnInit() {
    this.settingTabValue()
  }

  settingTabValue() {
    this.selected.setValue(this.search.tabAgain);
  }

  sendDetails(form: NgForm, _id: string) {
    form.value["_id"] = _id;
    console.log(form.value);
    this.eventService.getEventDetails(form.value).subscribe(
      res => {
        console.log(res);
        this.eventService.details1 = res;
        console.log(this.eventService.details1);
        this.router.navigate(["/bigevents"]);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log("error");
        }
      }
    );
  }
}
