import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

export var decoded: any;
export var File

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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  send() {
    const token=localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
   const options = {
      headers : headers
    };
    File = (document.getElementById("file2") as HTMLInputElement).files
    console.log(File)
    const frmData = new FormData();
     frmData.append("img", File[0]);
    frmData.append("name", File[0].name);
    this.http
      .post("https://backend-athena.herokuapp.com/uploadProfile", frmData,options)
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
    const Nme=e.target.files[0].name;
    console.log(e.target.files[0].name)
    document.getElementById("file1label").textContent = Nme
    console.log((document.getElementById("file2") as HTMLInputElement).files)
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
    this.http.post('https://backend-athena.herokuapp.com/getProfileName',options).subscribe(res=>{
      console.log(res)
      console.log('IMAGE TO SHOW')
      this.imageToShow=res['name']
      console.log(this.imageToShow)
    })
  }


}
