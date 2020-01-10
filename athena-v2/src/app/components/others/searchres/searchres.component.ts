import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { EventService } from './../../../shared/events/event.service'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-searchres',
  templateUrl: './searchres.component.html',
  styleUrls: ['./searchres.component.css']
})
export class SearchresComponent implements OnInit {
  results: any = this.search.results;

  constructor(public search: SearchService, public eventService: EventService, private router: Router,private auth:AuthService) { }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
  }
  sendDetails(form: NgForm, _id: string) {
    form.value['_id'] = _id;
    console.log(form.value);
    this.eventService.getEventDetails(form.value).subscribe(
      res => {
        console.log(res)
        this.eventService.details1 = res;
        console.log(this.eventService.details1)
        this.router.navigate(['/bigevents'])
      },
      err => {
        if (err.status === 422) {
          // this.serverErrormessage = err.error.join('<br/>');
          console.log(422);
        } else {
          // this.serverErrormessage = "Something went wrong"
          console.log("error");
        }
      }
    );
  }
}
