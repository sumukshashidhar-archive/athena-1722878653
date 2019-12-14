import { AchievementsService } from './../../../shared/achievements/achievements.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NameService } from "./../../../shared/name/name.service";
import { CookieService } from "ngx-cookie-service";
import * as jwt_decode from 'jwt-decode';
import { Component, OnInit, Inject } from "@angular/core";
import { DatasharingService } from "../../../shared/search/datasharing.service";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { Search } from "../../../shared/search/search.model";
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { Achievements } from 'src/app/shared/achievements/achievements.model';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
export var decoded :any 
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  imageToShow:any
  uploadedFiles: Array < File > ;
  username: any;
  ipAddress:string;
  path:''
  ach_list:any
   
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, 
    
    private auth: AuthService,
    private router: Router,
    private data: DatasharingService,
    private uname: NameService,
    public datasharingService: DatasharingService,
    private http:HttpClient,
    private ach:AchievementsService
  ) {
    decoded= localStorage.getItem('access_token');
    this.refreshAchievements();
  }
  refreshAchievements() {
    this.ach.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      console.log(this.ach_list);
      this.ach_list=this.ach_list.slice(0,5);
      console.log(this.ach_list)
    });
  }


createImageFromBlob(image:Blob){
  let reader= new FileReader();
  reader.addEventListener("load",()=>{
    this.imageToShow=reader.result;
  },false);
  if(image){
    reader.readAsDataURL(image)
  }
  }








  




  send(){
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post('http://localhost:3000/uploadProfile', formData)
        .subscribe((response) => {
            console.log('response received is ', response);
            this.path= response['path']
            console.log(this.path)
         this.getImage(this.path);
        });

        this.postEvents();
        this.http.post('http://localhost:3000/uploadProfile',this.uploadedFiles)
  }

  getImage(path) {

    this.http.get('http://localhost:3000/getImage' + '?url=' + path,{ responseType:'blob'}).subscribe
    ((response:Blob)=>{
      console.log('response as blob');
      console.log(response);
       this.createImageFromBlob(response);
    }); 

  }










  
  fileChange(element) {
    this.uploadedFiles = element.target.files;
}


postEvents() {
  const token=this.localStorage.getItem('access_token')
  const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
  const options = {
    headers: headers
  };
  return this.http.post("http://localhost:3000/uploadProfile",options);
}
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getIP()
  {
      this.auth.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      this.http.post('http://localhost:3000/api/ip', this.ipAddress )
      console.log('IP POSTED')
    });
  }
  ngOnInit() {
    var decodedtoken= jwt_decode(decoded)
    this.getIP();

    this.data.currentName.subscribe((res: Response) => {
      if (decodedtoken["role"] == "Student") {
        this.username = decodedtoken["given_name"];
      }
      console.log(this.username);
    });
  }

  onSubmit(form: NgForm) {
    this.datasharingService.postSearch(form.value).subscribe(
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
