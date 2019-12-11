import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() {
    
   }
   onSubmit() {
  console.log((document.getElementById("searchvalue") as HTMLInputElement).value);
  (document.getElementById("searchvalue") as HTMLInputElement).value=''
  }
  ngOnInit() {
    
  }

}
