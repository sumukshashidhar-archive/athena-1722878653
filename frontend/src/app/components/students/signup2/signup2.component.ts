import { InterestSendingService } from "./../../../shared/interests/interest-sending.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.css"]
})
export class Signup2Component implements OnInit {
  interest: string;
  interests = [];
  constructor(private interestsendingservice: InterestSendingService) {}
  onClick() {
    this.interests.push({
      name: this.interest
    });
    this.interest = "";
  }
  onSubmit() {
    this.interestsendingservice.postInterest(this.interests).subscribe(
      res => {
        console.log("Auth is successful");
        console.log(this.interests);
      },
      err => {
        console.log("ERROR");
      }
    );
  }
  ngOnInit() {}
}
