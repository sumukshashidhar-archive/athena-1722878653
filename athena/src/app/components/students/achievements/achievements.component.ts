import { AuthService } from './../../../shared/auth/auth.service'
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
import { InterestsService } from './../../../shared/interests/interests.service';
export var File;
export var achlist;
export var Achievement: Achievements = {
  uploadedFiles: [],
  achCat: "",
  achSubCat: "",
  description: "",
  rank: ""
};

@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.css"]
})
export class AchievementsComponent implements OnInit {
  desc:any;
  img:any;
  profileUrlExists = false;
  imageToShow: any;
  uploadedFiles: Array<File>;
  showSpinner: boolean = true;
  ach_list: any;
  enableClose = false;
  path: "";
  link: any;
  Rank:any
  numbers = [1, 2, 3, 4, 5];
  list = [
    { id: 1, name: "School" },
    { id: 2, name: "City" },
    { id: 3, name: "State" },
    { id: 4, name: "National" },
    { id:5,name:"International"}
  ];
  imageArr = [];
  allset = false;
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
  localStorage: any;
  rank: any;
  file: any;
  username: any;
  decoded:any
  constructor(
    public achService: AchievementsService,
    private router: Router,
    private http: HttpClient,
    public interestsService: InterestsService,
    public auth: AuthService,
    private catService: EventService,
  ) {
    this.decoded = localStorage.getItem("access_token");
    this.noOfChoice.push("1");
  }

  ngOnInit() {
    this.refreshAchievements();
    this.getAllCategory();
    this.postToIt();
    var decodedtoken = jwt_decode(this.decoded);
    console.log(decodedtoken)
    if (decodedtoken["role"] == "Student") {
      console.log(decodedtoken["given_name"])
      this.username = decodedtoken["given_name"];}

  }

  getAllCategory() {
    this.interestsService.getcategoryDetails().subscribe(res => {
      this.categoryOption = res;
      console.log(this.categoryOption);
    });
  }
  DoIt(id:any){
    console.log(id)
    console.log(achlist)
    for(var i=0;i<achlist.length;i++){
      if(achlist[i]._id==id){
       this.desc=achlist[i].Description
       this.img=achlist[i].Image
       console.log(this.desc)
       console.log(this.img)
       this.Rank=achlist[i].achRank

      }
    }

  }
  selectionChanged(event) {
    this.subCatName = null;
    console.log(event);
    console.log(event.value);

    Achievement.achCat = event.value["catName"];
    this.interestsService.getSubCategory(event.value.catId).subscribe(res => {
      this.subcatOptions = res;
    });
  }

  adduserInterestList() {
    let arr = [];
    for (let i = 0; i < this.subCatName.length; i++) {
      arr.push(this.subCatName[i].subCatName);
    }
    console.log(arr);
    console.log(this.rank["name"]);
    Achievement.rank = this.rank["name"];
    console.log(this.subCatName["subCatName"]);
    Achievement.achSubCat = this.subCatName["subCatName"];

    console.log(this.uploadedFiles);

    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        "uploads[]",
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }

    console.log(formData);
    this.http
      .post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/abcd", formData)
      .subscribe(response => {
        console.log("response received is ", response);
        Achievement.uploadedFiles = response["Image"];

        console.log(Achievement);
        this.achService.postAchievements(Achievement).subscribe(res => {
          console.log(res);
        });
      });
  }

  readSingleFile(e) {
    // const name = e[0].name;
    const name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }

  onSubmit(form: NgForm) {
    console.log("UPLOAD METHOD");
    Achievement.description = (document.getElementById(
      "description"
    ) as HTMLInputElement).value;
    console.log(this.rank["name"]);
    Achievement.rank = this.rank["name"];
    console.log(this.subCatName["subCatName"]);
    Achievement.achSubCat = this.subCatName["subCatName"];
    File = (document.getElementById("file1") as HTMLInputElement).files;
    const frmData = new FormData();
    console.log(File[0]);
    console.log(File[0].name);
    Achievement.uploadedFiles = File[0].name;
    console.log(Achievement);
    frmData.append("img", File[0]);
    console.log(frmData);
    this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/upload", frmData).subscribe(res => {
      console.log(res);
    });
    this.achService.postAchievements(Achievement).subscribe(res => {
      console.log(res);
      location.reload()
    });

  }


  logout() {
    this.auth.logout();
  }
  refreshAchievements() {
    this.achService.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      achlist=this.ach_list;
      console.log(this.ach_list);
      File = this.ach_list[2].Image;
      for (var i = 0; i < this.ach_list.length; i++) {
        console.log(this.ach_list[i].Image);
        var pa = this.ach_list[i].Image;
        console.log(pa);
        //  this.postToIt(pa)
      }

      this.showSpinner = false;
      console.log(
        "Show spinner is now false and we are in the refresh achievements method"
      );
    });
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


  setAttr() {
    // console.log(File);
    // console.log(`http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/${File}`);
    // document
    //   .getElementById("i1")
    //   .setAttribute("src"", `http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/${File}`);
    var x = (document.getElementById("testimg123") as HTMLInputElement).value;
    console.log(x)
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
    this.enableClose = true;
  }
}
