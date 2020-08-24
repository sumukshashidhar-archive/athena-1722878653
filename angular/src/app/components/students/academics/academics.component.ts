import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Academics } from "./../../../shared/academics/academics.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AcademicsService } from "./../../../shared/academics/academics.service";
export var File;
export var Image;
import * as jwt_decode from "jwt-decode";
@Component({
  selector: "app-academics",
  templateUrl: "./academics.component.html",
  styleUrls: ["./academics.component.css"]
})
export class AcademicsComponent implements OnInit {
  file: any;
  Image: any;
  acadlist: any;
  thisacadlist = [];
  thisacadlistA=[]
  constructor(
    public academicSerice: AcademicsService,
    private http: HttpClient,
    private router:Router,
    public _snackBar:MatSnackBar
  ) {
    var decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);
    if(decodedtoken["role"]!="Student"){
      router.navigate(['/orgdashboard'])
    }
  }

  ngOnInit() {
    this.getAcademics();
  }
  readSingleFile(e) {
    const name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top"
    });
  }

  getAcademics() {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders().set("Authorization", "Bearer" + token);
    const options = {
      headers: headers
    };
    this.http
      .post("https://backend-athena.herokuapp.com/getAcademics", options)
      .subscribe(res => {
        console.log(res);
        this.acadlist = res;
      },
      err=>{
        this.router.navigate(['/login'])
      });
  }
  getThisAcad(form: NgForm, acId:any){
    var decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);

    form.value['email'] = decodedtoken['email']
    form.value['acId'] = acId
    console.log(form.value)
    this.http.post("https://backend-athena.herokuapp.com/getSpecicifAc",form.value).subscribe(res=>{
      console.log('RESPONSE FOR GET ACADEMIC')
      console.log(res)
      console.log(acId)
      this.thisacadlistA[0]=res as Academics
      console.log(this.thisacadlist)
    })
  }
  onSubmit(form: NgForm) {
    File = (document.getElementById("file1") as HTMLInputElement).files;
    form.value["Image"] = File[0].name;
    if(File[0].size/1024000<2.1){
      const frmData = new FormData();
    frmData.append("img", File[0]);
    console.log(frmData);
    this.http.post("https://backend-athena.herokuapp.com/upload", frmData).subscribe(res => {
      console.log(res);
    });

    this.academicSerice.postAcademics(form.value).subscribe(
      res => {
        location.reload();
        console.log(res);
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

}
