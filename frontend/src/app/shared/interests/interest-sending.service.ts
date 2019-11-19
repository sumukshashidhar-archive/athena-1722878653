import {
  User
} from './../user/user.model';
import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterestSendingService {

  constructor(private http: HttpClient) {}

  postInterest(interests: string[]) {
    console.log(Object)
    return this.http.post('http://localhost:3000/interest', interests)
  }
}