import { UserService } from "./../../../shared/user/user.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { cities } from './../../others/cities'
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatAutocomplete } from '@angular/material/autocomplete'

export var email
export var school
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  Captchaval: boolean = false;
  showSuccessmessage: boolean;
  serverErrormessage: string;
  test: any;
  cities = cities;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse.length > 0) {
      this.Captchaval = true;
    } else {
      this.Captchaval = false;
    }
  }
 
  constructor(
    public userService: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ["", Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ["", Validators.required]
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => 
        option.toLowerCase().includes(filterValue)
      )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  onSubmit(form: NgForm) {
    this.test = (document.getElementById('bio') as HTMLTextAreaElement).value
    form.value['bio']=this.test;
    email=form.value['email']
    school=form.value['studentSchool']
    form.value['DOB'] = Date.parse(form.value['DOB'])
    console.log(school)
    console.log(email)
    if (form.value['bio'] == null || form.value['bio'] == undefined || form.value['bio'] == "") {
      this.openSnackBar('Please enter your bio in the "Tell us more about yourself" section', "Close")
      return;
    }
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/verifyemail"]);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log("error");
        }
        this.openSnackBar("User Already Exists", "Close")
      }
    );
  }

}
