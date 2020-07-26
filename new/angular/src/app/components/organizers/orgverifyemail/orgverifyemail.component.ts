import { orgemail } from './../signup-organizer/signup-organizer.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-orgverifyemail',
  templateUrl: './orgverifyemail.component.html',
  styleUrls: ['./orgverifyemail.component.css']
})
export class OrgverifyemailComponent implements OnInit {
 Email=orgemail
  constructor() { }

  ngOnInit() {
  }

}
