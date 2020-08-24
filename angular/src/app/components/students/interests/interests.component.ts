import { Router } from '@angular/router';
import { AuthService } from "./../../../shared/auth/auth.service";
import { InterestsService } from "./../../../shared/interests/interests.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { EventService } from "../../../shared/events/event.service";
import { HttpClient } from "../../../../../node_modules/@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatList } from '@angular/material/list';

export let bio;
@Component({
  selector: "app-interests",
  templateUrl: "./interests.component.html",
  styleUrls: ["./interests.component.css"]
})
export class InterestsComponent implements OnInit {
  // interest: string;
  // interests = [];
  categoryOption: any;
  catName: any;
  subCatName: any;
  subcatOptions: any;
  noOfChoice = new Array<string>();
  profileUrlExists: any;
  imageToShow: any;
  decoded: any;
  username: any;
  interests: any;
  constructor(
    public interestsService: InterestsService,
    private http: HttpClient,
    public auth: AuthService,
    private catService: EventService,
    private _snackBar: MatSnackBar,
    private router:Router
  ) {
    this.decoded = localStorage.getItem("access_token");
    this.noOfChoice.push("1");
    var decodedtoken = jwt_decode(this.decoded);
    if(decodedtoken["role"]!="Student"){
      router.navigate(['/orgdashboard'])
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
    location.reload();
  }

  logout() {
    this.auth.logout();
  }

  getInterests(){
    this.http.get("https://backend-athena.herokuapp.com/interests").subscribe(
      res => {
        console.log(res);
        this.interests = res
      },
      err => {
        if(err.status==403){
          this.router.navigate(['/login'])
        }
        console.log(err)
      }
    )
  }

  ngOnInit() {
    var decodedtoken = jwt_decode(this.decoded);
    console.log(decodedtoken);
    this.getInterests();
    this.getAllCategory();
  }

  getAllCategory() {
    this.interestsService.getcategoryDetails().subscribe(res => {
      this.categoryOption = res;
      console.log(this.categoryOption);
    });
  }

  selectionChanged() {
    this.subCatName = null;
    console.log(this.catName)
    var _id = this.catName
    this.interestsService.getSubCategory(_id).subscribe(res => {
      this.subcatOptions = res;
      console.log(this.subcatOptions)
    });
  }

  adduserInterestList() {
    let arr = [];
    arr.push(this.subCatName)
    console.log(arr)
    if (this.subCatName == null || this.subCatName == undefined) {
      this.openSnackBar("Please select Interests", "Close")
      return;
    }
    this.interestsService.postUserInterest(arr).subscribe(
      res => {
        console.log("Added user Interests");
        console.log(res);
        this.openSnackBar("User Interests Added", "Close");
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteInterest(form: NgForm ,interest:string){
    form.value['interest'] = interest
    this.http.post("https://backend-athena.herokuapp.com/deleteInterest", form.value).subscribe(
      res => {
        console.log(res)
        this.openSnackBar("You have deleted the interest. Please reload the page to see the changes take effect", "Close")
      },
      err => {
        console.log(err)
      }
    )
  }
}
