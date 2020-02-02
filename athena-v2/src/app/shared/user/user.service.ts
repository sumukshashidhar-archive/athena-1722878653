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
    pincode: 0,
    bio:"",
    studentSchool: "",
    eventsAttending:[]
  };

  constructor(private http: HttpClient) {}

  postUser(user: User) {
    console.log(user)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/register", user);
  }
}
