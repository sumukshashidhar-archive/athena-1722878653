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
      "https://backend-athena.herokuapp.com/resetPasswordCode",
      securityAnswer
    );
  }
}