import { User } from "./../user/user.model";
import { Injectable, Inject } from "@angular/core";
import { LOCAL_STORAGE } from '@ng-toolkit/universal'
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Interests } from './interests.model';

@Injectable({
  providedIn: "root"
})
export class InterestsService {
  selectedInt: Interests = {
    interests: "",
  }
  
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {}

  postUserInterest(userInterest) {

    const token=this.localStorage.getItem('access_token')
    const headers = new HttpHeaders().set('Authorization','Bearer'+token) ;
    const options = {
      headers : headers
    };
    console.log(userInterest)
    return this.http.post("http://localhost:3000/addInterest", userInterest,options);
  }

  getcategoryDetails() {
    console.log("Categories")
    return this.http.get("http://localhost:3000/getCategoriesAll");
  }

  getSubCategory(id) {
    console.log("Subcategories")
    return this.http.get("http://localhost:3000/getCategoriesId?catId="+id);
  }

}
