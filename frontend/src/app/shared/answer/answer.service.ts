import { Injectable } from "@angular/core";
import { Answer } from "./answer.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AnswerService {
  selectedAnswer: Answer = {
    code: ""
  };

  constructor(private http: HttpClient) {}

  postAnswer(securityAnswer: Answer) {
    console.log(securityAnswer);
    return this.http.post(
      "http://localhost:3000/resetpassword",
      securityAnswer
    );
  }
}
