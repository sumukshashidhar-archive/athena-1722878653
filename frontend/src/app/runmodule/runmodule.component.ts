import { KeyaddService } from './../keyadd/keyadd.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-runmodule',
  templateUrl: './runmodule.component.html',
  styleUrls: ['./runmodule.component.css']
})
export class RunmoduleComponent implements OnInit {

  constructor(private keyaddService:KeyaddService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.keyaddService.postModule(form.value).subscribe(
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

