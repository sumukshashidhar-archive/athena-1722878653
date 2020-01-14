import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Search } from './search.model';
import { User_Search } from './user_search.model'

@Injectable({
  providedIn: "root"
})

export class SearchService {
  private name = new BehaviorSubject(null);
  currentName = this.name.asObservable();
  results: any;
  userResults: any;
  message: any;
  interestResults: any;
  tabChange: any;

  userDetails: any

  selSearch: Search = {
    keyword: '',
    usecase: 1
  };
  
  eventTab:any = 0;

  selSearch1: User_Search = {
    userKey: ""
  }

  constructor(private http: HttpClient) {}

  changeName(name: string) {
    this.name.next(name);
  }

  postSearch(search: Search){
    console.log('Search method')
    console.log(search)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/event-search", search)
  }

  postUserSearch(userSearch: User_Search) {
    console.log('User Search Method')
    console.log(userSearch)
    return this.http.post('http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/api/search/users', userSearch)
  }

  getUserDetails(userDetails){
    console.log("User Details method")
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/api/tracker/click-on-user-event", userDetails)
  }

  postInterestSearch(interest){
    console.log(interest)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com/api/searchbyinterests", interest)
  }
}
