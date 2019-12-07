import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Search } from './../../shared/search.model';
import { DatasharingService } from './../../shared/datasharing.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  constructor(public data: DatasharingService, private router: Router,public  auth:AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  onSubmit(form: NgForm) {
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
