import { LoginService } from "./../../shared/login/login.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthGuard } from "../../auth/auth.guard";
import { User } from "../../shared/user/user.model";
import { decoded } from "../../auth/auth.service";
import { DatasharingService } from "./../../shared/datasharing.service";
import { first } from "rxjs/operators";

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
    private data: DatasharingService
  ) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ["", Validators.required]
    });
    this.data.currentName.subscribe(name => (this.fname = name));
  }

  onSubmit(form: NgForm) {
    this.Auth.login(form.value)
      // .pipe(first())
      .subscribe(
        res => {
          // this.user = res;
          // this.fname = this.user.FirstName
          // console.log(this.user.FirstName)
          console.log(res);
          if (decoded["role"] == "Student") {
            this.router.navigate(["/dashboard"]);
          }
          if (decoded["role"] == "Org") {
            this.router.navigate(["/organizerdashboard"]);
          }
          console.log(this.user);
          this.data.changeName(this.user.FirstName);
        },
        err => {
          console.log("Could not authenticate");
          console.log(err);
          this.error = true;
        }
      );
  }
}

// this.loginService.postLogin(form.value).subscribe(
//   res => {
//     console.log('Auth is successful')
//     this.cookieService.set( 'test', 'Hello World' );
//     this.loginFailed = 'false';

//     console.log(this.cookieService)

//     this.router.navigate(['/dashboard'])
//     this.showSuccessmessage = true;
//     //setTimeout(() => this.showSuccessmessage = false, 3000);

//   },
//   err => {
//     if (err.status === 422){
//       this.loginFailed = 'true';
//       this.serverErrormessage = err.error.join('<br/>');
//       this.router.navigate(['/login'])
//     }
//     else{
//       this.loginFailed = 'true';
//       this.serverErrormessage = err.status
//       this.router.navigate(['/login'])
//     }
//   }
// );
