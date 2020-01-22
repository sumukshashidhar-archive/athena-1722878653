import { Component, OnInit } from "@angular/core";
import { SearchService } from "./../../../shared/search/search.service";
import { EventService } from "./../../../shared/events/event.service";
import { Router } from "@angular/router";
import { NgForm, FormControl } from "@angular/forms";
import { AuthService } from "src/app/shared/auth/auth.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-searchres",
  templateUrl: "./searchres.component.html",
  styleUrls: ["./searchres.component.css"]
})
export class SearchresComponent implements OnInit {
  results: any = this.search.results;
  userResults: any = this.search.userResults;
  orgResults: any = this.search.orgResults;
  interestResults: any = this.search.interestResults;

  selected = new FormControl(0);

  constructor(
    public search: SearchService,
    public eventService: EventService,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.settingTabValue();
  }

  logout() {
    this.auth.logout();
  }

  settingTabValue() {
    this.selected.setValue(this.search.tabChange);
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

  tabChange2(){
    this.search.tabAgain = 1
  }

  sendDetails1(form: NgForm, _id: string) {
    form.value["_id"] = _id;
    console.log(form.value);
    this.search.getUserDetails(form.value).subscribe(
      res => {
        console.log(res);
        this.search.userDetails = res;
        this.router.navigate(["/usersearchres"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
