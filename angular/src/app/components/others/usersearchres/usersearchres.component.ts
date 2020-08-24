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
  Rank: any;
  ach_list: any;
  desc: any;
  img: any;

  constructor(public search: SearchService,private http:HttpClient) {
    console.log(this.user['Academics'])
    console.log(this.thisacadlist)
  }
  getThisAcad(form: NgForm, acId:any){
    form.value['email'] = this.user['EmailId']
    form.value['acId'] = acId
    console.log(form.value)
    this.http.post("https://backend-athena.herokuapp.com/getSpecicifAc",form.value).subscribe(res=>{
      console.log('RESPONSE FOR GET ACADEMIC')
      console.log(res)
      console.log(acId)
      this.thisacadlistA[0]=res as Academics
      console.log(this.thisacadlist)
    })
  }
  thisAch(id:any){
    console.log(id)
    this.DoIt(id);
  }
  DoIt(id:any){
    console.log(id)
    for(var i=0;i<this.user.Achievement.length;i++){
      if(this.user.Achievement[i]._id==id){
       this.desc=this.user.Achievement[i].Description
       this.img=this.user.Achievement[i].Image
       console.log(this.desc)
       console.log(this.img)
       this.Rank=this.user.Achievement[i].achRank

      }
    }

  }

  ngOnInit() {
  }

}
