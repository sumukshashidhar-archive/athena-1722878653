import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from './../../../shared/events/event.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  selected = new FormControl(0);

  constructor(public data: SearchService, private router: Router, public eventService: EventService) { }

  ngOnInit() {
    this.settingTabValue();
  }

  settingTabValue() {
    this.selected.setValue(this.data.tabAgain);
  }

  onSubmit(form: NgForm) {
    form.value['usecase'] = 3
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        this.data.tabAgain = 1
        this.data.results = null;
        var x = this.eventService.changeDate(res)
        this.data.results = x;
        this.router.navigate(['/searchres2'])
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
    form.value['usecase'] = 2
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        this.data.tabAgain = 0
        this.data.results = null;
        var x = this.eventService.changeDate(res)
        this.data.results = x;
        this.router.navigate(['/searchres2'])
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
