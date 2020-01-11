import { AuthService } from './../../../shared/auth/auth.service';
import { InterestSendingService } from './../../../shared/interests/interest-sending.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../../../shared/events/event.service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { MatSnackBar } from '@angular/material/snack-bar';
export let bio;
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  // interest: string;
  // interests = [];
  showAlert: boolean = false

  config = {
    search: true,
    height: 'auto',
    placeholder: 'Select',
    displayKey: 'catName'
  };

  configSubCat = {
    search: true,
    height: 'auto',
    placeholder: 'Select',
    displayKey: 'subCatName'
  };
  subCatName: any;
  categoryOption: any;
  subcatOptions: any;
  noOfChoice = new Array<string>();
  profileUrlExists:any
  imageToShow:any;
  decoded:any
  username:any
  constructor(public interestsendingservice: InterestSendingService,private http:HttpClient, public auth: AuthService, private catService: EventService, private _snackBar: MatSnackBar) {
    this.decoded = localStorage.getItem("access_token");
    this.noOfChoice.push('1');
  }
  // onClick() {
  //   this.interests.push({
  //     name: this.interest
  //   });
  //   this.interest = "";


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
      },
      false
    );
    this.profileUrlExists = true;
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  postToIt() {
    // this.http.get('http://localhost:3000/imageUpload').subscribe(res=>{
    //   console.log(res)
    this.http
      .get("http://localhost:3000/imageUpload", { responseType: "blob" })
      .subscribe((response: Blob) => {
        console.log("response as blob");
        console.log(response);
        this.createImageFromBlob(response);
      });
  }
  logout() {
    this.auth.logout();
  }
  onSubmit(form: NgForm) {
    bio = (form.value.bio);
    console.log(bio);
    this.interestsendingservice.postInterest(form.value).subscribe(
      res => {
        console.log('Auth is successful');
        console.log(res);
      },
      err => {
        console.log('ERROR');
      }
    );
  }
  ngOnInit() {
    this.postToIt();
    var decodedtoken = jwt_decode(this.decoded);
    console.log(decodedtoken)
    if (decodedtoken["role"] == "Student") {
      console.log(decodedtoken["given_name"])
      this.username = decodedtoken["given_name"];}
    
    this.getAllCategory();
  }

  getAllCategory() {

    this.catService.getcategoryDetails().subscribe(res => {
      this.categoryOption = res;
      console.log(this.categoryOption);
    });
  }


  selectionChanged(event) {
    this.subCatName = null;
    console.log(event);
    this.catService.getSubCategory(event.value.catId).subscribe(res => {
      this.subcatOptions = res;
    });
  }

  adduserInterestList() {

    let arr = [];
    for (let i = 0; i < this.subCatName.length; i++) {
      arr.push(this.subCatName[i].subCatName);
    }

    // this.catService.postUserInterest(arr).subscribe(res => {
    //   console.log('done');
    //   this.subCatName = null;
    //   alert('User Interest added');
    // });
    this.catService.postUserInterest(arr).subscribe(
      res => {
        console.log("Added user Interests");
        console.log(res);
        this.showAlert = true
        this.openSnackBar("User Interests Added", "Close")
      },
      err => {
        console.log(err)
      }
    )
  }
}