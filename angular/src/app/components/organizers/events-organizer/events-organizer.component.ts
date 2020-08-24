import { AuthService } from "./../../../shared/auth/auth.service";
import { cities } from './../../others/cities'
import { HttpClient } from "@angular/common/http";
import { Event } from "./../../../shared/events/event.model";
import { Component, OnInit } from "@angular/core";
import { SearchService } from "./../../../shared/search/search.service";
import { InterestsService } from './../../../shared/interests/interests.service'
import * as jwt_decode from "jwt-decode";
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { EventService } from "./../../../shared/events/event.service";
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatAutocomplete } from '@angular/material/autocomplete'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export var decoded: any;
export var File;
export var name;

@Component({
  selector: "app-events-organizer",
  templateUrl: "./events-organizer.component.html",
  styleUrls: ["./events-organizer.component.css"]
})
export class EventsOrganizerComponent implements OnInit {
  returnedEvents: any;
  maxDate: string;
  newDate: string;
  username: any;
  selected=new FormControl(0)
  match = false;
  arr: any;
  myEvents: any
  y: any;
  x: any;
  profileUrlExists = false;
  imageToShow: any;
  config = {
    search: true,
    height: "auto",
    placeholder: "Select",
    displayKey: "catName"
  };

  configSubCat = {
    search: true,
    height: "auto",
    placeholder: "Select",
    displayKey: "subCatName"
  };
  file: any;
  subCatName: any;
  categoryOption: any;
  subcatOptions: any;
  noOfChoice = new Array<string>();

  cities = cities;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  decoded: any;
  constructor(
    public eventService: EventService,
    private router: Router,
    private http: HttpClient,
    private data: SearchService,
    private auth: AuthService,
    public interestsService : InterestsService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
    decoded = localStorage.getItem("access_token");
    this.noOfChoice.push("1");
    this.setTab();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  ngOnInit() {
    var decodedtoken = jwt_decode(decoded);
    if(decodedtoken["role"]!="Org"){
      this.router.navigate(['/dashboard'])
    }
    this.refreshEvents();
    this.maxDateSet();
    this.getAllCategory();
    this.getEvents();
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

  logout() {
    this.auth.logout();
  }
  readSingleFile(e) {
    name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }

  getAllCategory() {
    this.interestsService.getcategoryDetails().subscribe(res => {
      this.categoryOption = res;
      console.log(this.categoryOption);
    });
  }

  selectionChanged(event) {
    this.subCatName = null;
    console.log(event);
    this.interestsService.getSubCategory(event.value.catId).subscribe(res => {
      this.subcatOptions = res;
      console.log(this.subcatOptions)
    });
  }

  onSubmit(form: NgForm) {
    File = (document.getElementById("file1") as HTMLInputElement).files;
    form.value["Image"] = File[0].name;
    if(File[0].size/1024000<4.1){
      const frmData = new FormData();
      frmData.append("img", File[0]);
      console.log(frmData);
      form.value['evnDate1'] = Date.parse(form.value['evnDate1'])
      form.value['evnDate2'] = Date.parse(form.value['evnDate2'])
      this.http.post("https://backend-athena.herokuapp.com/upload", frmData).subscribe(res => {
        console.log(res);
      });
      let arr = [];
      for (let i = 0; i < this.subCatName.length; i++) {
        arr.push(this.subCatName[i].subCatName);
      }
      if (this.subCatName == null || this.subCatName == undefined || this.subCatName == ""){
        this.openSnackBar("Please add event interests", "Close")
        return;
      }
      console.log(typeof(form.value['evnDate1']))
      form.value["interestArray"] = arr;
      console.log(form.value["interestArray"]);
      form.value["evnLocation"] =
        form.value["evnAdd1"] + "\n" + form.value["evnAdd2"];
      this.eventService.postEvents(form.value).subscribe(
        res => {
          console.log(res);
          this.y = res;
          this.x = this.y._id;
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
    else{
      this.openSnackBar("File is too big. Try again with a smaller file", "Close");
    }

  }

  getEvents(){
    this.eventService.getOrganizerEvents().subscribe(
      res => {
        console.log(res)
        var x = this.eventService.changeDate(res)
        this.myEvents = x;
      },
      err => {
        console.log(err)
      }
    )
  }

  setMaxDate() {
    var x = (document.getElementById("evnDate1") as HTMLInputElement).value;
    console.log("variable x is ", x);
    this.newDate = x;
  }

  maxDateSet() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var newmm;
    var newdd;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      newdd = "0" + dd.toString();
    } else {
      newdd = dd.toString();
    }
    if (mm < 10) {
      newmm = "0" + mm.toString();
    } else {
      newmm = mm.toString();
    }
    this.maxDate = yyyy + "-" + newmm + "-" + newdd;
  }

  refreshEvents() {
    var decodedtoken = jwt_decode(decoded);
    console.log(decoded);
    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Org") {
        this.username = decodedtoken["name"];
      }
      console.log(this.username);
    });
  }

  setTab(){
    this.selected.setValue(this.data.eventTab)
  }
  sendDetails(form: NgForm, _id: string){
    form.value['_id'] = _id;
    this.http.post("https://backend-athena.herokuapp.com/api/vectorless/click-on-events", form.value).subscribe(
      res => {
        sessionStorage.setItem("evnDetails", JSON.stringify(res))
        this.eventService.details1 = res
        console.log(res)
        this.router.navigate(['/bigevents'])
      },
      err => {
        console.log(err)
      }
    )
  }
}
