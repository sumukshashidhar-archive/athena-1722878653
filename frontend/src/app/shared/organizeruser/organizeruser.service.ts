import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  OrgUser
} from './organizeruser.model';
@Injectable({
  providedIn: 'root'
})
export class OrganizeruserService {

  selectedUser: OrgUser = {
    OrganizerName: '',
    OrganizerEmail: '',
    RegistrationDate: '',
    Password: '',
    PhoneNo: '',
    userType: 'Organizer'
  };

  constructor(private http: HttpClient) {}

  postOrgUser(user: OrgUser) {
    return this.http.post('http://localhost:3000/registerorganizer', user)
  }
}