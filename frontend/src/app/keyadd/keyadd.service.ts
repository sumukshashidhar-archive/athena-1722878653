import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeyAdd } from './keyadd.model';

@Injectable({
  providedIn: 'root'
})
export class KeyaddService {
  selectedUser: KeyAdd = {
    username: "",
    password: "",
    key: "",
  };
  postKey(keyadd: KeyAdd) {
    console.log(keyadd)
    return this.http.post("http://localhost:3000/1b08dd3d330c927106bba6bb785301c97cf2090ee7b067c685a258eba35a608e", keyadd);
  }
  constructor(private http:HttpClient) { }
}
