import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParameterCodec,
  HttpClientModule
} from "@angular/common/http";
import { PassResetEmail } from "./pass-reset-email.model";

@Injectable({
  providedIn: "root"
})
export class PassResetEmailService {
  selectedEmail: PassResetEmail = {
    email: ""
  };

  constructor(private http: HttpClient) {}

  postEmail(email: PassResetEmail) {
    console.log(email);
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/reset", email);
  }
}
