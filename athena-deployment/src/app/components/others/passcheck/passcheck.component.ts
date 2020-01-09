import { Component, OnInit } from "@angular/core";
import { PassResetEmailService } from "../../../shared/pass_reset_email/pass-reset-email.service";
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { PassResetEmail } from "../../../shared/pass_reset_email/pass-reset-email.model";
import { ResetcodeService } from "./../../../shared/resetcode/resetcode.service";
import { NewpassService } from './../../../shared/newpass/newpass.service';

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
    public passService: PassResetEmailService,
    private router: Router,
    public answerService: ResetcodeService,
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
        this.answerService.authCode = form.value['code']
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
