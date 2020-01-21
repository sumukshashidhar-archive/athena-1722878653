import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AchievementsService } from "./../../../shared/achievements/achievements.service";
import { EventService } from './../../../shared/events/event.service'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { OnInit, Inject } from "@angular/core";
import { SearchService } from "../../../shared/search/search.service";
import { AuthService } from "./../../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { Search } from "../../../shared/search/search.model";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Achievements } from "src/app/shared/achievements/achievements.model";

export var decoded: any;

@Component({
  selector: 'app-orgdashboard',
  templateUrl: './orgdashboard.component.html',
  styleUrls: ['./orgdashboard.component.css']
})
export class OrgdashboardComponent implements OnInit {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Your Events', cols: 1, rows: 1, route: "/eventsorg" },
          { title: 'Discover', cols: 1, rows: 1, route: "/discover" },
          { title: 'Create an Event', cols: 1, rows: 1, route: "/orgdashboard" }
        ];
      }

      return [
        { title: 'Your Events', cols: 2, rows: 1, route: "/eventsorg" },
        { title: 'Discover', cols: 1, rows: 1, route: "/discover" },
        { title: 'Create an Event', cols: 1, rows: 1, route: "/orgdashboard" }
      ];
    })
  );
  profileUrlExists = false;
  imageToShow: any;
  uploadedFiles: Array<File>;
  username: any;
  path: "";
  ach_list: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    private data: SearchService,
    private http: HttpClient,
    public eventService: EventService,
    private ach: AchievementsService
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var email = decodedtoken["email"];
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    var decodedtoken = jwt_decode(decoded);
    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Org") {
        this.username = decodedtoken["name"];
      }
      console.log(this.username);
    });
  }

  onSubmit(form: NgForm) {
    this.data.postSearch(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
        console.log("Error");
      }
    );
  }

  search(form: NgForm) {
    form.value['usecase'] = 1
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        this.data.results = null;
        var x = this.eventService.changeDate(res)
        this.data.results = x;
        console.log(res);
        this.data.tabChange = 0;
        if (this.data.results.length === 0) {
          this.data.message = "Sorry, no results found";
        } else {
          this.data.message = "We found these results";
        }
        this.router.navigate(["/searchres"]);
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
}


