import { OrganizerService } from "./../../../shared/organizer/organizer.service";
import { UserService } from "./../../../shared/user/user.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { cities } from './../../others/cities'
import { Router } from "@angular/router";
export var orgemail;

@Component({
  selector: "app-signup-organizer",
  templateUrl: "./signup-organizer.component.html",
  styleUrls: ["./signup-organizer.component.css"],
  providers: [OrganizerService]
})
export class SignupOrganizerComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  Captchaval: boolean = false;
  showSuccessmessage: boolean;
  serverErrormessage: string;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  cities = cities;
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse.length > 0) {
      this.Captchaval = true;
    } else {
      this.Captchaval = false;
    }
  }
  constructor(
    public organizeruserService: OrganizerService,
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

  onSubmit(form: NgForm) {
    this.organizeruserService.postOrgUser(form.value).subscribe(
      res => {
        orgemail=form.value['OrganizerEmail']
        console.log(orgemail)
        this.showSuccessmessage = true;
        setTimeout(() => (this.showSuccessmessage = false), 3000);
        this.router.navigate(["/orgverifyemail"]);
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
