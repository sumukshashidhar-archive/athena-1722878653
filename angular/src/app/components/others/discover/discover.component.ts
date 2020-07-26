import { HttpClient } from "@angular/common/http";
import { AuthService } from "./../../../shared/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { SearchService } from "../../../shared/search/search.service";
import { InterestsService } from "./../../../shared/interests/interests.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import * as jwt_decode from "jwt-decode";
import { MatSnackBar } from "@angular/material";
import { EventService } from "./../../../shared/events/event.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"]
})
export class DiscoverComponent implements OnInit {
  isStudent: any;
  isOrg: any;
  username: any;
  imageToShow: any;
  profileUrlExists = false;
  decoded: any;
  catName: any;
  subCatName: any;
  categoryOption: any;
  subcatOptions: any;
  noOfChoice = new Array<string>();

  constructor(
    public data: SearchService,
    private router: Router,
    public auth: AuthService,
    private http: HttpClient,
    public eventService: EventService,
    public interestsService: InterestsService,
    private _snackBar: MatSnackBar
  ) {
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
    this.decoded = localStorage.getItem("access_token");
  }

  ngOnInit() {
    this.noOfChoice.push("1");
    this.getAllCategory();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  // Advanced Event Search

  deepSearch(form: NgForm) {
    form.value["usecase"] = 2;
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        sessionStorage.clear()
        var x = this.eventService.changeDate(res);
        sessionStorage.setItem("results", JSON.stringify(x))
        this.data.results = x;
        console.log(res);
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

  archiveSearch(form: NgForm) {
    form.value["usecase"] = 3
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        sessionStorage.clear()
        var x = this.eventService.changeDate(res);
        sessionStorage.setItem("results", JSON.stringify(x))
        this.data.results = x;
        console.log(res);
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

  getAllCategory() {
    this.interestsService.getcategoryDetails().subscribe(res => {
      this.categoryOption = res;
      console.log(this.categoryOption);
    });
  }

  selectionChanged() {
    this.subCatName = null;
    console.log(this.catName);
    var _id = this.catName;
    this.interestsService.getSubCategory(_id).subscribe(res => {
      this.subcatOptions = res;
      console.log(this.subcatOptions);
    });
  }

  // Search by interests below

  searchByInterest() {
    console.log(this.subCatName);
    if (this.subCatName == null) {
      this.openSnackBar(
        "Please mention category and subcategory of the interest",
        "Close"
      );
      return;
    } else {
      let arr = [];
      arr.push(this.subCatName);
      console.log(arr);
      this.data.postInterestSearch(arr).subscribe(
        res => {
          sessionStorage.removeItem("userResults")
          sessionStorage.removeItem("results")
          sessionStorage.setItem("userResults", JSON.stringify(res))
          this.data.interestResults = res;
          console.log(res);
          this.router.navigate(["/searchres"]);
        },
        err => {
          console.log(err);
          this.openSnackBar("No users found", "Close");
        }
      );
    }
  }

  eventsearchByInterest() {
    if (this.subCatName == null) {
      this.openSnackBar("Please Enter Category", "Close");
      return;
    }
    let arr = [];
    arr.push(this.subCatName);
    console.log(arr);
    this.data.postEventSearch(arr).subscribe(
      res => {
        sessionStorage.clear()
        console.log(res);
        var x = this.eventService.changeDate(res);
        sessionStorage.setItem("results", JSON.stringify(x))
        console.log(res);
        this.router.navigate(["/searchres"]);
      },
      err => {
        console.log(err);
        this.openSnackBar("No Events Found", "Close");
      }
    );
  }
}
