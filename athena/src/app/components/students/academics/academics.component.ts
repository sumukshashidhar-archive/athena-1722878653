import { Academics } from './../../../shared/academics/academics.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AcademicsService } from "./../../../shared/academics/academics.service";
export var File;
export var Image;
@Component({
  selector: "app-academics",
  templateUrl: "./academics.component.html",
  styleUrls: ["./academics.component.css"]
})
export class AcademicsComponent implements OnInit {
  file: any;
  Image: any;
  acadlist: any;
  thisacadlist=[]
  constructor(
    public academicSerice: AcademicsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAcademics();
  }
  readSingleFile(e) {
    // const name = e[0].name;
    const name = e.target.files[0].name;
    document.getElementById("file-label").textContent = name;
  }

  getAcademics() {
    const token = localStorage.getItem("access_token");
    const headers = new HttpHeaders().set("Authorization", "Bearer" + token);
    const options = {
      headers: headers
    };
    this.http
      .post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/getAcademics", options)
      .subscribe(res => {
        console.log(res);
        this.acadlist = res;
      });
  }
  getThisAcad(acId:any){
    this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/getSpecicifAc",{acId}).subscribe(res=>{
      console.log('RESPONSE FOR GET ACADEMIC')
      console.log(res)
      this.thisacadlist[0]=res as Academics
      console.log(this.thisacadlist)
    })
  }

  onSubmit(form: NgForm) {
    File = (document.getElementById("file1") as HTMLInputElement).files;
    form.value["Image"] = File[0].name;
    const frmData = new FormData();
    frmData.append("img", File[0]);
    console.log(frmData);
    this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/upload", frmData).subscribe(res => {
      console.log(res);
    });

    this.academicSerice.postAcademics(form.value).subscribe(
      res => {
        location.reload()
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
}
