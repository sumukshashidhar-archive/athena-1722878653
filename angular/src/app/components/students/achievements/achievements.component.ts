import { AuthService } from "./../../../shared/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { AchievementsService } from "./../../../shared/achievements/achievements.service";
import { Achievements } from "../../../shared/achievements/achievements.model";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import * as jwt_decode from "jwt-decode";
import { LoadingComponent } from "./../../others/loading/loading.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventService } from "./../../../shared/events/event.service";
import { InterestsService } from "./../../../shared/interests/interests.service";
import { MatSnackBar } from "@angular/material/snack-bar";
export var File;
export var achlist;
export var achId;

@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.css"]
})
export class AchievementsComponent implements OnInit {
  desc: any;
  img: any;
  profileUrlExists = false;
  imageToShow: any;
  uploadedFiles: Array<File>;
  showSpinner: boolean = true;
  ach_list: any;

  path: "";
  link: any;
  Rank: any;
  numbers = [1, 2, 3, 4, 5];
  list = [
    { id: 1, name: "School" },
    { id: 2, name: "City" },
    { id: 3, name: "State" },
    { id: 4, name: "National" },
    { id: 5, name: "International" }
  ];

  test123: any;

  config = {
    search: true,
    height: "auto",
    placeholder: "Select",
    displayKey: "catName"
  };

  configRank = {
    search: true,
    height: "auto",
    placeholder: "Select",
    displayKey: "name"
  };

  configSubCat = {
    search: true,
    height: "auto",
    placeholder: "Select",
    displayKey: "subCatName"
  };
  subCatName: any;
  categoryOption: any;
  subcatOptions: any;
  noOfChoice = new Array<string>();
  rank: any;
  file: any;
  username: any;
  decoded: any;
  constructor(
    public achService: AchievementsService,
    private router: Router,
    private http: HttpClient,
    public interestsService: InterestsService,
    public auth: AuthService,
    private catService: EventService,
    private _snackBar: MatSnackBar
  ) {
    this.decoded = localStorage.getItem("access_token");
    this.noOfChoice.push("1");
    var decodedtoken = jwt_decode(this.decoded);
    if(decodedtoken["role"]!="Student"){
      router.navigate(['/orgdashboard'])
    }
  }

  ngOnInit() {
    this.refreshAchievements();
    this.getAllCategory();
    var decodedtoken = jwt_decode(this.decoded);
    console.log(decodedtoken);
    if (decodedtoken["role"] == "Student") {
      console.log(decodedtoken["given_name"]);
      this.username = decodedtoken["given_name"];
    }
  }

  getAllCategory() {
    this.interestsService.getcategoryDetails().subscribe(res => {
      this.categoryOption = res;
      console.log(this.categoryOption);
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top"
    });
  }

  DeleteAch(achID: any) {
    console.log("ID IS", achID);
    this.achService.deleteAchievement(achId).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status == 200) {
          console.log(err);
          this.openSnackBar("Successfully Deleted", "Close");
          location.reload();
          return;
        } else {
          console.log(err);
          this.openSnackBar("Error in Deletion", "Close");
          return;
        }
      }
    );
  }

  DoIt(id: any) {
    achId = id;

    for (var i = 0; i < achlist.length; i++) {
      if (achlist[i]._id == id) {
        this.desc = achlist[i].Description;
        this.img = achlist[i].Image;
        console.log(achlist[i].Name)
        console.log(achlist[i].Image)
        this.Rank = achlist[i].achRank;
      }
    }
  }
  selectionChanged(event) {
    this.subCatName = null;
    console.log(event);
    console.log(event.value);
    this.interestsService.getSubCategory(event.value.catId).subscribe(res => {
      this.subcatOptions = res;
      console.log(res);
    });
  }

  readSingleFile(e) {
    const name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }

  onSubmit(form: NgForm) {
    console.log("UPLOAD METHOD");

    console.log(form.value);
    File = (document.getElementById("file1") as HTMLInputElement).files;
    console.log(File[0].size/1024000)
    if(File[0].size/1024000<2.1){
      const frmData = new FormData();
    console.log(File[0].name);
    form.value["file"] = File[0].name;
    console.log(form.value);
    frmData.append("img", File[0]);
    console.log(frmData);
    this.http.post("https://backend-athena.herokuapp.com/upload", frmData).subscribe(res => {
      console.log(res);
    });
    this.achService.postAchievements(form.value).subscribe(res => {
      console.log(res);
      this.openSnackBar("Successfully Added your achievement!", "Close");
      location.reload();
    });
    }
    else{
      this.openSnackBar("File is too big. Try again with a smaller file", "Close");
    }
  }

  logout() {
    this.auth.logout();
  }
  refreshAchievements() {
    this.achService.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      achlist = this.ach_list;

      this.showSpinner = false;
      console.log(
        "Show spinner is now false and we are in the refresh achievements method"
      );
    });
  }

  setAttr() {

    var x = (document.getElementById("testimg123") as HTMLInputElement).value;
    console.log(x);
    this.test123 = x;
  }
  onDelete(_id: string) {
    if (confirm("Do you want to delete this record ?") == true) {
      this.achService.deleteAchievement(_id).subscribe(res => {
        this.refreshAchievements();
      });
    }
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }
}
