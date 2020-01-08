import { Injectable } from "@angular/core";
import { NewPass } from "./newpass.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NewpassService {
  emailToSend: any;

  selectedPass: NewPass = {
    email: "",
    password: ""
  };

  constructor(private http: HttpClient) {}

  postPassword(pass: NewPass) {
    console.log(pass);
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/resetpassword", pass);
  }
}
