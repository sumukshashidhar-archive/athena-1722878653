import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../../../shared/auth/auth.service';
import { SearchService } from './../../../shared/search/search.service'
import * as jwt_decode from "jwt-decode";
import { EventService } from './../../../shared/events/event.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  username: any;
  isStudent: any
  isOrg: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout() {
      this.auth.logout();
      this.router.navigate(["/login"]);
    }

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router, public searchService: SearchService, public eventService: EventService) {
    var decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);

    if (decodedtoken["role"] == "Student") {
      this.username = decodedtoken["given_name"];
      this.isStudent = true;
    }
    if (decodedtoken["role"] == "Org") {
      this.isOrg = true;
      this.username = decodedtoken["name"];
    }
  }

  search(form: NgForm) {
    form.value["usecase"] = 1;
    console.log(form.value);
    this.searchService.postSearch(form.value).subscribe(
      res => {
        this.searchService.results = null;
        this.searchService.userResults = null;
        this.searchService.interestResults = null;
        this.searchService.orgResults = null;
        var x = this.eventService.changeDate(res);
        this.searchService.results = x;
        console.log(res);
        this.searchService.tabChange = 0;
        if (this.searchService.results.length === 0) {
          this.searchService.message = "Sorry, no results found";
        } else {
          this.searchService.message = "We found these results";
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
