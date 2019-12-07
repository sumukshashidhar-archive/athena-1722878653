import { AuthService } from 'src/app/auth/auth.service';
import { InterestSendingService } from "./../../../shared/interests/interest-sending.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
export var bio
@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.css"]
})
export class Signup2Component implements OnInit {
  // interest: string;
  // interests = [];
  constructor(private interestsendingservice: InterestSendingService,public auth:AuthService) {}
  // onClick() {
  //   this.interests.push({
  //     name: this.interest
  //   });
  //   this.interest = "";
  // }


  logout(){
    this.auth.logout()
  }
  onSubmit(form: NgForm) {
  bio=(form.value['bio'])
  console.log(bio)
    this.interestsendingservice.postInterest(form.value).subscribe(
      res => {
        console.log("Auth is successful");
        console.log(res);
      },
      err => {
        console.log("ERROR");
      }
    );
  }
  ngOnInit() {}
}