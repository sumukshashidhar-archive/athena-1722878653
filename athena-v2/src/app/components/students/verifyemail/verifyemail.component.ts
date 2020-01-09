import { email } from './../../students/signup/signup.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {
  Email= email
  constructor() { }

  ngOnInit() {
  }

}
