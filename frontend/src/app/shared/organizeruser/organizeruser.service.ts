import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OrgUser } from "./organizeruser.model";
@Injectable({
  providedIn: "root"
})
export class OrganizeruserService {
  selectedUser: OrgUser = {
    OrganizerName: "",
    OrganizerEmail: "",
    RegistrationDate: "",
    Password: "",
    PhoneNo: "",
    userType: "Organizer",
    securityAnswer: "",
    securityQuestion: ""
  };

  constructor(private http: HttpClient) {}

  postOrgUser(user: OrgUser) {
    console.log(user)
    return this.http.post("http://localhost:3000/registerorganizer", user);
  }
}
