import { KeyaddService } from './keyadd.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-keyadd',
  templateUrl: './keyadd.component.html',
  styleUrls: ['./keyadd.component.css']
})
export class KeyaddComponent implements OnInit {
  
  constructor(private Auth: AuthService, private http:HttpClient,public keyaddService: KeyaddService) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.keyaddService.postKey(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {

          console.log(422);
        } else {
          console.log("Error");
        }
      }
    );
  }
}