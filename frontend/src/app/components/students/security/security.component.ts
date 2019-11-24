import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../shared/user/user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.css"],
  providers: [UserService]
})
export class SecurityComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}
  onSubmit(form: NgForm) {
    //send the data here
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log("Posted security question");
        this.router.navigate(["/login"]);
      },
      err => {
        if (err.status === 422) {
          console.log("422");
        } else {
          console.log("Error");
        }
      }
    );
  }
  ngOnInit() {}
}
