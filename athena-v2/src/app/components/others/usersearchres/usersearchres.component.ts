import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'

@Component({
  selector: 'app-usersearchres',
  templateUrl: './usersearchres.component.html',
  styleUrls: ['./usersearchres.component.css']
})
export class UsersearchresComponent implements OnInit {
  user: any = this.search.userDetails.obj;
  thisacadlist=this.search.userDetails.obj['Academics']
 profilepic:any=this.search.userDetails.dp
  constructor(public search: SearchService) { 
    console.log(this.user['Academics'])
    console.log(this.thisacadlist)
    // console.log(this.user.dp)
    // this.profilepic=this.user.dp
  }

  ngOnInit() {
  }

}
