import { Injectable } from "@angular/core";
import { NewPass } from "./newpass.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NewpassService {
  selectedPass: NewPass = {
    password: ""
  };

  constructor(private http: HttpClient) {}

  postPassword(pass: NewPass) {
    console.log(pass);
    return this.http.post("http://localhost:3000/new-password", pass);
  }
}
