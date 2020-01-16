import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

export var decoded: any;


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  profileUrlExists=false
  imageToShow:any
  username: any;
  isStudent: any
  isOrg: any;
  file: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private http:HttpClient,
    private _snackBar: MatSnackBar
  ) {
    decoded = localStorage.getItem("access_token");
    var decodedtoken = jwt_decode(decoded);

    if (decodedtoken["role"] == "Student") {
      this.username = decodedtoken["given_name"];
      this.isStudent = true;
    }
    if (decodedtoken["role"] == "Org") {
      this.isOrg = true;
      this.username = decodedtoken["name"];
    }
   }

  ngOnInit() {
    console.log('SIDENAV')
    this.getProfileName()
  }
  send() {
    console.log(this.file)
    const token=localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    var File = (document.getElementById("file1") as HTMLInputElement).files
    console.log(File[0])
    const frmData = new FormData();
    frmData.append("img", File[0]);
    frmData.append("name", File[0].name);
    this.http
      .post("http://localhost:3000/uploadProfile", frmData,options)
      .subscribe(res => {
        console.log(res);
      }
      ,err=>{
        if(err.status==200){
          this.openSnackBar("Successfully Updated","Close")
          location.reload()
        }
        else{
          this.openSnackBar("Error while updating","Close")
        }
      });
  }


  readSingleFile(e) {
    console.log(e.target.files[0].name)
    const Name = e.target.files[0].name;
    document.getElementById("file1label").textContent = Name;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  getProfileName(){
    const token=localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    this.http.post('http://localhost:3000/getProfileName',options).subscribe(res=>{
      console.log(res)
      console.log('IMAGE TO SHOW')
      this.imageToShow=res['name']
      console.log(this.imageToShow)
    })
  }

  
}
