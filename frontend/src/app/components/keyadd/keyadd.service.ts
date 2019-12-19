import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeyAdd } from './keyadd.model';
import { RunModule } from '../runmodule/runmodule.model';

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

  postModule(module:RunModule){
    console.log(module)
    return this.http.post("http://localhost:3000/f8ff5cec5f99f6cbf3a6533ee75627d1c25091dd1d22593ac14e02bc9e97368e", module);

  }
  constructor(private http:HttpClient) { }
}
