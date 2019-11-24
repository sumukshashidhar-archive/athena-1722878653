import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParameterCodec,
  HttpClientModule
} from "@angular/common/http";
import { Email } from "./password.model";

@Injectable({
  providedIn: "root"
})
export class PasswordService {
  selectedEmail: Email = {
    email: ""
  };

  constructor(private http: HttpClient) {}

  postEmail(email: Email) {
    console.log(email);
    return this.http.post("http://localhost:3000/reset", email);
  }
}
