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
    studentSchool: "",
    eventsAttending:[]
  };

  constructor(private http: HttpClient) {}

  postLogin(user: User) {
    console.log(Object);
    send=user.bio
    console.log(`BIO is {send}`)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/login", user);
  }
}
