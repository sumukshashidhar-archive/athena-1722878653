import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admin: Admin = {
    username: "",
    password: "",
    key: ""
  }

  constructor(private http: HttpClient) { }

  postAdmin(admin: Admin){
    console.log(admin)
    return this.http.post("http://localhost:3000/admin_add", admin)
  }
}
