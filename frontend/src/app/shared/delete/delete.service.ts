import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Delete } from "./delete.model";

@Injectable({
  providedIn: "root"
})
export class DeleteService {
  selectedDelete: Delete = {
    email: "",
    password: ""
  };

  constructor(private http: HttpClient) {}

  postDelete(del: Delete) {
    console.log(del);
  }
}
