import { Component, OnInit } from "@angular/core";
import { PasswordService } from "../../shared/password/password.service";
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { Email } from "../../shared/password/password.model";
import { AnswerService } from "./../../shared/answer/answer.service";
import { NewpassService } from './../../shared/newpass/newpass.service';

@Component({
  selector: "app-passcheck",
  templateUrl: "./passcheck.component.html",
  styleUrls: ["./passcheck.component.css"]
})
export class PasscheckComponent implements OnInit {
  x: any;
  y: any;
  emailToSend:any;

  constructor(
    public passService: PasswordService,
    private router: Router,
    public answerService: AnswerService,
    public newPass: NewpassService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.emailToSend = form.value.email;
    this.newPass.emailToSend = this.emailToSend;
    this.passService.postEmail(form.value).subscribe(
      res => {
        this.x = res;
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

  compare(x1: string) {
    if (this.x.code==x1){
      this.router.navigate(['/resetpass'])
    }
    else {
      console.log('Wrong Code')
    }
  }

  onsubmit(form: NgForm) {
    form.value['email'] =this.emailToSend;

    console.log(form.value)
    this.answerService.postAnswer(form.value).subscribe(
      res => {
        console.log(res);
        this.y = res;
        if (res) {
          console.log(res)
          this.router.navigate(['/resetpass']);
        } else {
          console.log("Wrong answer");
        }
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
