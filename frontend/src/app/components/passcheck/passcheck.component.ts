import { Component, OnInit } from "@angular/core";
import { PasswordService } from "../../shared/password/password.service";
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { Email } from "../../shared/password/password.model";
import { AnswerService } from "./../../shared/answer/answer.service";

@Component({
  selector: "app-passcheck",
  templateUrl: "./passcheck.component.html",
  styleUrls: ["./passcheck.component.css"]
})
export class PasscheckComponent implements OnInit {
  x: any;

  constructor(
    public passService: PasswordService,
    private router: Router,
    public answerService: AnswerService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.passService.postEmail(form.value).subscribe(
      res => {
        console.log(res);
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

  onsubmit(form: NgForm) {
    this.answerService.postAnswer(form.value).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.router.navigate(["/resetpass"]);
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
