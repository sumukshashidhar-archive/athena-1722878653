import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'

@Component({
  selector: 'app-usersearchres',
  templateUrl: './usersearchres.component.html',
  styleUrls: ['./usersearchres.component.css']
})
export class UsersearchresComponent implements OnInit {
  user: any = this.search.userDetails;

  constructor(public search: SearchService) { }

  ngOnInit() {
  }

}
