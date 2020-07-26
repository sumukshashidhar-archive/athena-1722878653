import { LoginService } from "./../../../shared/login/login.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthGuard } from "./../../../shared/auth/auth.guard";
import { User } from "../../../shared/user/user.model";
import { decoded } from "../../../shared/auth/auth.service";
import { SearchService } from "../../../shared/search/search.service";
import { first } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public error: boolean;
  user: any;
  fname: string;
  userData: User;
  showSuccessmessage: boolean;
  serverErrormessage: string;
  protected aFormGroup: FormGroup;
  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private Auth: AuthService,
    private router: Router,
    public loginService: LoginService,
    private _snackBar: MatSnackBar,
    private data: SearchService
  ) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ["", Validators.required]
    });
    this.data.currentName.subscribe(name => (this.fname = name));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  onSubmit(form: NgForm) {
    this.Auth.login(form.value)
      .subscribe(
        res => {
          console.log(res);
          if (decoded["role"] == "Student") {
            this.router.navigate(["/dashboard"]);
          }
          if (decoded["role"] == "Org") {
            this.router.navigate(["/orgdashboard"]);
          }
          console.log(this.user);
          this.data.changeName(this.user.FirstName);
        },
        err => {
          console.log("Could not authenticate");
          console.log(err);
          this.error = true;
          this.openSnackBar("Wrong Password", "Close")
        }
      );
  }
}
