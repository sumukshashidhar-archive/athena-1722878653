// import { Router } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NewpassService } from "./../../../shared/newpass/newpass.service";
import { ResetcodeService } from './../../../shared/resetcode/resetcode.service'

@Component({
  selector: "app-resetpass",
  templateUrl: "./resetpass.component.html",
  styleUrls: ["./resetpass.component.css"]
})
export class ResetpassComponent implements OnInit {

  constructor(
    private router:Router,
    public newPass: NewpassService,
    public answerService: ResetcodeService
  ) {}

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    form.value['authCode'] = this.answerService.authCode
    form.value['email']=this.newPass.emailToSend;
    this.newPass.postPassword(form.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
        console.log("Error");
      }
    );
  }
}
