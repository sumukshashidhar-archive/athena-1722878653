import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../../shared/search/search.service'
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { NgForm } from '@angular/forms'
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
  }
  getThisAcad(form: NgForm, acId:any){
    form.value['email'] = this.user['EmailId']
    form.value['acId'] = acId
    console.log(form.value)
    this.http.post("http://localhost:3000/getSpecicifAc",form.value).subscribe(res=>{
      console.log('RESPONSE FOR GET ACADEMIC')
      console.log(res)
      console.log(acId)
      this.thisacadlistA[0]=res as Academics
      console.log(this.thisacadlist)
    })
  }

  ngOnInit() {
  }

}
