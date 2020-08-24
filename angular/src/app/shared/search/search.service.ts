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
  results: any; // Event Search Results
  userResults: any; // User Search Results
  message: any; // Message to be displayed
  interestResults: any; // Interest Search Results
  // tabChange: any; // Searchres page tab
  // tabAgain: any; // Searchres2 page tab
  orgResults: any; // Organizer userr search results

  userDetails: any; //User click on user details

  keyword2: any // Carrying out the search again

  selSearch: Search = { // Event Search
    keyword: '',
    usecase: 1
  };

  selOrgUser = { //Organizer Search
    orgKey: ""
  }

  eventTab:any; //Changing tab to following events tab on events page

  selSearch1: User_Search = { //User Search
    userKey: ""
  }

  constructor(private http: HttpClient) {}

  changeName(name: string) {
    this.name.next(name);
  }

  postSearch(search){
    console.log('Search method')
    console.log(search)
    return this.http.post("https://backend-athena.herokuapp.com/event-search", search)
  }

  postUserSearch(userSearch) {
    console.log('User Search Method')
    console.log(userSearch)
    return this.http.post('https://backend-athena.herokuapp.com/api/search/users', userSearch)
  }

  getUserDetails(userDetails){
    console.log("User Details method")
    return this.http.post("https://backend-athena.herokuapp.com/api/tracker/click-on-user-event", userDetails)
  }

  getUserDetailsorg(userdetails) {
    return this.http.post("https://backend-athena.herokuapp.com/api/tracker/vectorless/click-on-user-event", userdetails)
  }

  postInterestSearch(interest){
    console.log(interest)
    return this.http.post("https://backend-athena.herokuapp.com/api/searchbyinterests", interest)
  }

  postOrgSearch(obj){
    return this.http.post("https://backend-athena.herokuapp.com/api/search/organizers", obj)
  }

  postEventSearch(obj){
    return this.http.post("https://backend-athena.herokuapp.com/api/organiser/searchbyinterests", obj)
  }
}
