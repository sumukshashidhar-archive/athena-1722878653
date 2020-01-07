import { User } from "./../user/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Interests } from './interests.model';

@Injectable({
  providedIn: "root"
})
export class InterestsService {
  selectedInt: Interests = {
    interests: "",
  }
  
  constructor(private http: HttpClient) {}

  postInterest(interests: Interests) {
    console.log(interests);
    return this.http.post("https://backend-athena.herokuapp.com/interests", interests);
  }
}
