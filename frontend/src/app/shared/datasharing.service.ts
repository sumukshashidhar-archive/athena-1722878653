import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DatasharingService {
  private name = new BehaviorSubject(null);
  currentName = this.name.asObservable();

  constructor() {}

  changeName(name: string) {
    this.name.next(name);
  }
}
