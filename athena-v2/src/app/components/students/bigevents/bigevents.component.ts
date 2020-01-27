import { HttpClient } from "@angular/common/http";
import { AuthService } from "./../../../shared/auth/auth.service";
import { EventDetails } from "./../events/events.component";
import { Component, OnInit } from "@angular/core";
import { EventService } from "./../../../shared/events/event.service";
import { ThrowStmt } from "@angular/compiler";
import { subscribeOn } from "rxjs/operators";
import { NgForm } from "@angular/forms";
import * as jwt_decode from "jwt-decode";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-bigevents",
  templateUrl: "./bigevents.component.html",
  styleUrls: ["./bigevents.component.css"]
})
export class BigeventsComponent implements OnInit {
  x: any
  decoded: any;
  follow: any;
  following: boolean;

  constructor(
    public eventService: EventService,
    private auth: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.decoded = localStorage.getItem("access_token");
  }

  ngOnInit() {
    this.x = JSON.parse(sessionStorage.getItem("evnDetails"))
    this.x['evnDate1'] = this.convert(this.x['evnDate1']);
    this.x['evnDate2'] = this.convert(this.x['evnDate2']);
  }
  logout() {
    this.auth.logout();
  }

  convert(date1){
    var s = new Date(date1).toLocaleDateString("en-US")
    return s;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  sendDetails(form: NgForm, _id: string) {
    form.value["_id"] = _id;
    console.log(form.value);
    this.eventService.postFollow(form.value).subscribe(
      res => {
        console.log(res);
        this.openSnackBar("You are now following this event", "Close");
        this.following = true
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log("error");
        }
        this.openSnackBar("Already Following this Event!!", "Close")
      }
    );
  }
}
