import { User } from "./../user/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Interests } from './interests.model';

@Injectable({
  providedIn: "root"
})
export class InterestSendingService {
  selectedInt: Interests = {
    interests: "",
    bio: ""
  }
  constructor(private http: HttpClient) {}

  postInterest(interests: Interests) {
    console.log(interests);
    return this.http.post("http://localhost:3000/interest", interests);
  }
}
