import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { EventService } from './../../../shared/events/event.service'
import { NgForm, FormControl } from '@angular/forms'
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-searchres2',
  templateUrl: './searchres2.component.html',
  styleUrls: ['./searchres2.component.css']
})
export class Searchres2Component implements OnInit {
  results: any = this.search.results;
  isStudent: any;
  isOrg: any;

  selected = new FormControl(0);

  constructor(private http: HttpClient, public search: SearchService, private router: Router, public eventService: EventService) {
    var decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);

    if (decodedtoken["role"] == "Student") {
      this.isStudent = true;
    }
    if (decodedtoken["role"] == "Org") {
      this.isOrg = true;
    }
   }

  ngOnInit() {
    this.settingTabValue()
  }

  settingTabValue() {
    this.selected.setValue(this.search.tabAgain);
  }

  sendDetails(form: NgForm, _id: string) {
    form.value["_id"] = _id;
    console.log(form.value);
    if (this.isStudent){
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
    else if (this.isOrg) {
      this.eventService.getEventDetailsorg(form.value).subscribe(
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
}
