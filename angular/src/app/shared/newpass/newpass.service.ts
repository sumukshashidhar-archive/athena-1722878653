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
    return this.http.post("https://backend-athena.herokuapp.com/resetpassword", pass);
  }
}
