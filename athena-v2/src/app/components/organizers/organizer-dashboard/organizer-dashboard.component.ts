import { AchievementsService } from "./../../../shared/achievements/achievements.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Component, OnInit, Inject } from "@angular/core";
import { SearchService } from "../../../shared/search/search.service";
import { AuthService } from "./../../../shared/auth/auth.service";
import { Router } from "@angular/router";
import { Search } from "../../../shared/search/search.model";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Achievements } from "src/app/shared/achievements/achievements.model";
import { LOCAL_STORAGE } from "@ng-toolkit/universal";
export var decoded: any;
@Component({
  selector: "app-organizer-dashboard",
  templateUrl: "./organizer-dashboard.component.html",
  styleUrls: ["./organizer-dashboard.component.css"]
})
export class OrganizerDashboardComponent implements OnInit {
  profileUrlExists = false;
  imageToShow: any;
  uploadedFiles: Array<File>;
  username: any;
  ipAddress: string;
  path: "";
  ach_list: any;
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,

    private auth: AuthService,
    private router: Router,
    private data: SearchService,
    private http: HttpClient,
    private ach: AchievementsService
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    var email = decodedtoken["email"];

    // this.refreshAchievements();
  }
  // refreshAchievements() {
  //   this.ach.getAchievements().subscribe(res => {
  //     this.ach_list = res as Achievements[];
  //     console.log(this.ach_list);
  //     this.ach_list=this.ach_list.slice(0,5);
  //     console.log(this.ach_list)
  //   });
  // }

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

  send() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        "uploads[]",
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.http
      .post("http://localhost:3000/uploadProfile", formData)
      .subscribe(response => {
        console.log("response received is ", response);
        this.path = response["path"];
        console.log(this.path);
        // this.setPath(this.path)
        //  this.getImage(this.path);
      });

    this.postEvents();
    this.http.post("http://localhost:3000/uploadProfile", this.uploadedFiles);
  }

  // setPath(path:string){
  //   console.log(path)
  //   this.http.post('http://localhost:3000/setPath',path).subscribe(res=>{
  //     console.log(res)
  //   })
  // }

  postToIt() {
    // this.http.get('http://localhost:3000/imageUpload').subscribe(res=>{
    //   console.log(res)
    this.http
      .get("http://localhost:3000/imageUpload", { responseType: "blob" })
      .subscribe((response: Blob) => {
        console.log("response as blob");
        console.log(response);
        this.createImageFromBlob(response);
      });
  }

  // getImage(path) {
  //   this.http.get('http://localhost:3000/getImage' + '?url=' + path,{ responseType:'blob'}).subscribe
  //   ((response:Blob)=>{
  //     console.log('response as blob');
  //     console.log(response);
  //      this.createImageFromBlob(response);
  //   });

  // }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  postEvents() {
    const token = this.localStorage.getItem("access_token");
    const headers = new HttpHeaders().set("Authorization", "Bearer" + token);
    const options = {
      headers: headers
    };
    return this.http.post("http://localhost:3000/uploadProfile", options);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getIP() {
    this.auth.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.http.post("http://localhost:3000/api/ip", this.ipAddress);
      console.log("IP POSTED");
    });
  }
  ngOnInit() {
    var decodedtoken = jwt_decode(decoded);
    this.getIP();

    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Org") {
        this.username = decodedtoken["name"];
      }
      console.log(this.username);
    });
  }

  onSubmit(form: NgForm) {
    this.data.postSearch(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
        console.log("Error");
      }
    );
  }
}
