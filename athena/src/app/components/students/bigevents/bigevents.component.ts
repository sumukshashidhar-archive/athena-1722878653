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
  x: any = this.eventService.details1;
  decoded: any;

  constructor(
    public eventService: EventService,
    private auth: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.decoded = localStorage.getItem("access_token");
  }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
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
