import { AuthService } from "./../../../shared/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Event } from "./../../../shared/events/event";
import { Component, OnInit } from "@angular/core";
import { SearchService } from "./../../../shared/search/search.service";
import { InterestsService } from './../../../shared/interests/interests.service'
import * as jwt_decode from "jwt-decode";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { EventService } from "./../../../shared/events/event.service";
export var decoded: any;
export var File;
export var name;
export var selectedEvent: Event = {
  evnPincode: "",
  evnName: "",
  evnOrganizerContact: "",
  evnDate1: "",
  evnDate2: "",
  evnOrganizerPage: "",
  evnTargetAge: 0,
  evnDescription: "",
  evnInterests: "",
  evnAdd1: "",
  evnAdd2: "",
  Image: ""
};
import { MatToolbarModule } from "@angular/material/toolbar";
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
  decoded: any;
  constructor(
    public eventService: EventService,
    private router: Router,
    private http: HttpClient,
    private data: SearchService,
    private auth: AuthService,
    public interestsService : InterestsService
  ) {
    decoded = localStorage.getItem("access_token");
    this.noOfChoice.push("1");
    this.postToIt();
  }

  ngOnInit() {
    var decodedtoken = jwt_decode(decoded);
    this.refreshEvents();
    this.maxDateSet();
    this.getAllCategory();
    this.getEvents();
    if (decodedtoken["role"] == "Org") {
      this.username = decodedtoken["name"];
    }
  }
  logout() {
    this.auth.logout();
  }
  readSingleFile(e) {
    // const name = e[0].name;
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
    const frmData = new FormData();
    frmData.append("img", File[0]);
    console.log(frmData);
    this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/upload", frmData).subscribe(res => {
      console.log(res);
    });
    let arr = [];
    for (let i = 0; i < this.subCatName.length; i++) {
      arr.push(this.subCatName[i].subCatName);
    }
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
      },
      false
    );
    this.profileUrlExists = true;
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  postToIt() {
    // this.http.get('http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/imageUpload').subscribe(res=>{
    //   console.log(res)
    this.http
      .get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/imageUpload", { responseType: "blob" })
      .subscribe((response: Blob) => {
        console.log("response as blob");
        console.log(response);
        this.createImageFromBlob(response);
      });
  }

  getEvents(){
    this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/api/retorgevents").subscribe(
      res => {
        console.log(res)
        this.myEvents = res;
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

  addEvnInterests() {
    let arr = [];
    for (let i = 0; i < this.subCatName.length; i++) {
      arr.push(this.subCatName[i].subCatName);
    }

    console.log("this.x ", this.x)
    console.log("subcatname", this.subCatName)
  }

  sendDetails(form: NgForm, _id: string){
    form.value['_id'] = _id;
    this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/api/vectorless/click-on-events", form.value).subscribe(
      res => {
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
