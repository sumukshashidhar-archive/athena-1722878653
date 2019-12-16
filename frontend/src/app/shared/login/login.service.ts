import { User } from "./../user/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
export var send
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
    pincode: "",
    bio:"",
    studentSchool: ""
  };

  constructor(private http: HttpClient) {}

  postLogin(user: User) {
    console.log(Object);
    send=user.bio
    console.log(`BIO is {send}`)
    return this.http.post("http://localhost:3000/login", user);
  }
}
