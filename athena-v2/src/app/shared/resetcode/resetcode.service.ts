import { Injectable } from "@angular/core";
import { Resetcode } from "./resetcode.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ResetcodeService {
  selectedAnswer: Resetcode = {
    code: "",
    email1: ""
  };

  authCode: string;

  constructor(private http: HttpClient) {}

  postAnswer(securityAnswer: Resetcode) {
    console.log(securityAnswer);
    return this.http.post(
      "http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/resetPasswordCode",
      securityAnswer
    );
  }
}