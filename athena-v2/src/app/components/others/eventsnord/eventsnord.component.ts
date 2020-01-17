import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventsnord',
  templateUrl: './eventsnord.component.html',
  styleUrls: ['./eventsnord.component.css']
})
export class EventsnordComponent implements OnInit {
  events: any

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.refreshEvents();
  }

  refreshEvents(){
    this.http.get("http://localhost:3000/getnord").subscribe(
      res => {
        this.events = res
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

}
