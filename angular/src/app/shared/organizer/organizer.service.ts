import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Organizer } from "./organizer.model";
@Injectable({
  providedIn: "root"
})
export class OrganizerService {
  selectedUser: Organizer = {
    OrganizerName: "",
    OrganizerEmail: "",
    RegistrationDate: "",
    Password: "",
    PhoneNo: "",
    userType: "Organizer",
    securityAnswer: "",
    securityQuestion: "",
    orgCity: ""
  };

  constructor(private http: HttpClient) {}

  postOrgUser(user: Organizer) {
    console.log(user)
    return this.http.post("https://backend-athena.herokuapp.com/registerorganizer", user);
  }
}
