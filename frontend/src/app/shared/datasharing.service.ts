import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Search } from './search.model';

@Injectable({
  providedIn: "root"
})

export class DatasharingService {
  private name = new BehaviorSubject(null);
  currentName = this.name.asObservable();

  selSearch: Search = {
    keyword: '',
    usecase: 0
  };

  constructor(private http: HttpClient) {}

  changeName(name: string) {
    this.name.next(name);
  }

  postSearch(search: Search){
    console.log('Search method')
    console.log(search)
    return this.http.post("http://localhost:3000/events_search", search)
  }
}
