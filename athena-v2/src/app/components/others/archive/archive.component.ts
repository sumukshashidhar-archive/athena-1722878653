import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(public data: SearchService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    form.value['usecase'] = 3
    console.log(form.value);
    this.data.postSearch(form.value).subscribe(
      res => {
        this.data.tabAgain = 1
        this.data.results = null;
        this.data.results = res;
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
        this.data.results = res;
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
