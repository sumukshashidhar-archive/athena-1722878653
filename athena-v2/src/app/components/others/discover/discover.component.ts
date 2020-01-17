import { HttpClient } from "@angular/common/http";
import { AuthService } from "./../../../shared/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { SearchService } from "../../../shared/search/search.service";
import { InterestsService } from "./../../../shared/interests/interests.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import * as jwt_decode from "jwt-decode";
import { MatSnackBar } from "@angular/material";
import { EventService } from './../../../shared/events/event.service'

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"]
})
export class DiscoverComponent implements OnInit {
  normal: any;
  deep: any;
  archive: any;
  isStudent = false;
  isOrg = false;
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

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  onSubmit(form: NgForm) {
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

  onSubmit1(form: NgForm) {
    this.data.postUserSearch(form.value).subscribe(
      res => {
        console.log(res);
        this.data.userResults = null;
        this.data.userResults = res;
        this.data.tabChange = 1;
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
          this.data.interestResults = res;
          this.data.tabChange = 2;
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

  eventsearchByInterest(){
    if (this.subCatName == null) {
      this.openSnackBar("Please Enter Category", "Close");
      return;
    }
    let arr = [] 
    arr.push(this.subCatName)
    console.log(arr)
    this.data.postEventSearch(arr).subscribe(
      res => {
        console.log(res)
        var x = this.eventService.changeDate(res)
        this.data.results = null;
        this.data.results = x;
        console.log(res);
        this.data.tabChange = 0;
        this.router.navigate(['/searchres'])
      },
      err => {
        console.log(err)
        this.openSnackBar("No Events Found", "Close")
      }
    )
  }

  orgSearch(form: NgForm){
    this.data.postOrgSearch(form.value).subscribe(
      res => {
        this.data.userResults = null;
        this.data.userResults = res;
        this.data.tabChange = 3;
        this.router.navigate(['/searchres'])
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
}
