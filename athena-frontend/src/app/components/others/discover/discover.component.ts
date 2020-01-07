import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Search } from '../../../shared/search/search.model';
import { SearchService } from '../../../shared/search/search.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  normal: any;
  deep: any;
  archive: any;
  isStudent=false
  isOrg=false
  username: any;
  imageToShow:any
  profileUrlExists=false
  decoded:any;
  constructor(public data: SearchService, private router: Router,public  auth:AuthService,private http:HttpClient) {
   var  decoded= localStorage.getItem('access_token');
    var decodedtoken= jwt_decode(decoded)
    if (decodedtoken["role"] == "Student") {
      this.username = decodedtoken["given_name"]
      this.isStudent=true


    }
    if(decodedtoken["role"]== "Org"){
      this.isOrg=true
      this.username = decodedtoken["name"]

    }
    this.decoded = localStorage.getItem("access_token");
  }

  ngOnInit() {
    this.postToIt();

  }

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
    this.router.navigate(["/login"]);
  }
  onSubmit(form: NgForm) {
    this.normal = document.getElementById("1")
    this.deep = document.getElementById("2")
    this.archive = document.getElementById("3")
    console.log(this.normal, this.deep, this.archive)
    if (this.normal.checked){
      form.value['usecase'] = 1
    }
    else if (this.deep.checked){
      form.value['usecase']= 2
    }
    else if (this.archive.checked) {
      form.value['usecase'] = 3
    }
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        this.data.results = res;
        console.log(res);
        this.router.navigate(['/searchres'])
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
        this.router.navigate(['/userres'])
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
