import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Search } from '../../shared/search/search.model';
import { DatasharingService } from '../../shared/search/datasharing.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  normal: any;
  deep: any;
  archive: any;

  constructor(public data: DatasharingService, private router: Router,public  auth:AuthService) { }

  ngOnInit() {
    
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  onSubmit(form: NgForm) {
    this.normal = document.getElementById("1")
    this.deep = document.getElementById("2")
    this.archive = document.getElementById("3")
    if (this.normal){
      form.value['usecase'] = 1
    }
    else if (this.deep){
      form.value['usecase']= 2
    }
    else if (this.archive) {
      form.value['usecase'] = 3
    }
    console.log(form.value);
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
      }
    );
  }

  onSubmit1(form: NgForm) {
    this.data.postUserSearch(form.value).subscribe(
      res => {
        console.log(res);
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
