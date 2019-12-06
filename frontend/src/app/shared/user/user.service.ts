import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class UserService {
  selectedUser: User = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
    DOB: "",
    phoneno: "",
    userType: "Student",
    securityQuestion: "",
    securityAnswer: "",
    pincode: ""
  };

  constructor(private http: HttpClient) {}

  postUser(user: User) {
    console.log(user)
    return this.http.post("http://localhost:3000/register", user);
  }
}
