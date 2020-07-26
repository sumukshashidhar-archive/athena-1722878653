import { Component, OnInit } from "@angular/core";
import { SearchService } from "./../../../shared/search/search.service";
import { EventService } from "./../../../shared/events/event.service";
import { Router } from "@angular/router";
import { NgForm, FormControl } from "@angular/forms";
import { AuthService } from "src/app/shared/auth/auth.service";
import * as jwt_decode from "jwt-decode";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-searchres",
  templateUrl: "./searchres.component.html",
  styleUrls: ["./searchres.component.css"]
})
export class SearchresComponent implements OnInit {
  results: any
  userResults: any = this.search.userResults;
  orgResults: any = this.search.orgResults;
  interestResults: any = this.search.interestResults;
  isStudent: any;
  isOrg: any;

  selected = new FormControl(0);

  constructor(
    public search: SearchService,
    public eventService: EventService,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {
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
    this.results = JSON.parse(sessionStorage.getItem("results"))
    this.userResults = JSON.parse(sessionStorage.getItem("userResults"))
    this.orgResults = JSON.parse(sessionStorage.getItem("orgResults"))
    this.interestResults = JSON.parse(sessionStorage.getItem("interestResults"))
  }

  logout() {
    this.auth.logout();
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

  sendDetails1(form: NgForm, _id: string) {
    form.value["_id"] = _id;
    console.log(form.value);
    if (this.isStudent) {
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
    else if (this.isOrg) {
      this.search.getUserDetailsorg(form.value).subscribe(
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

  eventSearch(){
    var obj = {}
    obj['keyword'] = sessionStorage.getItem("keyword")
    obj['usecase'] = 1
    this.search.postSearch(obj).subscribe(
      res => {
        sessionStorage.removeItem("results")
        sessionStorage.removeItem("userResults")
        sessionStorage.removeItem("orgResults")
        var x = this.eventService.changeDate(res)
        sessionStorage.setItem("results", JSON.stringify(x))
        this.search.keyword2 = obj['keyword']
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  studentSearch(){
    var obj = {}
    obj['userKey'] = sessionStorage.getItem("keyword");
    console.log(obj)
    this.search.postUserSearch(obj).subscribe(
      res => {
        sessionStorage.removeItem("results")
        sessionStorage.removeItem("userResults")
        sessionStorage.removeItem("orgResults")
        sessionStorage.setItem("userResults", JSON.stringify(res))
        this.search.keyword2 = obj['userKey']
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

  organizerSearch(){
    var obj = {}
    obj['orgKey'] = sessionStorage.getItem("keyword")
    console.log(obj,"asdjasdaoisdj")
    this.search.postOrgSearch(obj).subscribe(
      res => {
        console.log("response of orgsearch")
        sessionStorage.removeItem("results")
        sessionStorage.removeItem("userResults")
        sessionStorage.removeItem("orgResults")
        sessionStorage.setItem("orgResults", JSON.stringify(res))
        location.reload()
      }
    )
  }
}
