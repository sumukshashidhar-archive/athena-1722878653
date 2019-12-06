import { User } from "./../user/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  selectedUser: User = {
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    password: "",
    DOB: "",
    phoneno: "",
    userType: "",
    securityQuestion: "",
    securityAnswer: "",
    pincode: ""
  };

  constructor(private http: HttpClient) {}

  postLogin(user: User) {
    console.log(Object);
    return this.http.post("http://localhost:3000/login", user);
  }
}
