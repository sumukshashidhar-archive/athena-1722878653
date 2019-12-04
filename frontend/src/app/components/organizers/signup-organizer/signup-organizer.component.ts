import { OrganizeruserService } from "./../../../shared/organizeruser/organizeruser.service";
import { UserService } from "./../../../shared/user/user.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup-organizer",
  templateUrl: "./signup-organizer.component.html",
  styleUrls: ["./signup-organizer.component.css"],
  providers: [OrganizeruserService]
})
export class SignupOrganizerComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  Captchaval: boolean = false;
  showSuccessmessage: boolean;
  serverErrormessage: string;
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse.length > 0) {
      this.Captchaval = true;
    } else {
      this.Captchaval = false;
    }
  }
  constructor(
    public organizeruserService: OrganizeruserService,
    public userService: UserService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }
  onSubmit(form: NgForm) {
    this.organizeruserService.postOrgUser(form.value).subscribe(
      res => {
        this.showSuccessmessage = true;
        setTimeout(() => (this.showSuccessmessage = false), 3000);
        this.router.navigate(["/login"]);
        console.log('Signup organizer works')
      },
      err => {
        if (err.status === 422) {
          this.serverErrormessage = err.error.join("<br/>");
          console.log('Doesnt work')
        } else {
          this.serverErrormessage = "Work please";
          console.log('This is retarded')
        }
      }
    );
  }
}
