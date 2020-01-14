import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import{Academics} from './../../../shared/academics/academics.model'
@Component({
  selector: 'app-usersearchres',
  templateUrl: './usersearchres.component.html',
  styleUrls: ['./usersearchres.component.css']
})
export class UsersearchresComponent implements OnInit {
  user: any = this.search.userDetails.obj;
  thisacadlist=this.search.userDetails.obj['Academics']
  thisacadlistA=[];
 profilepic:any=this.search.userDetails.dp
  constructor(public search: SearchService,private http:HttpClient) { 
    console.log(this.user['Academics'])
    console.log(this.thisacadlist)
    // console.log(this.user.dp)
    // this.profilepic=this.user.dp
  }
  getThisAcad(acId:any){
    this.http.post("http://localhost:3000/getSpecicifAc",{acId}).subscribe(res=>{
      console.log('RESPONSE FOR GET ACADEMIC')
      console.log(res)
      this.thisacadlistA[0]=res as Academics
      console.log(this.thisacadlist)
    })
  }

  ngOnInit() {
  }

}
