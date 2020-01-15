import { Academics } from './academics.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AcademicsService {
  Academic: Academics = {
    Image:"",
    testName:"",
    testRank:"",
    toShow:true,
    testScore:""

  };
  constructor(private http:HttpClient) { }
  postAcademics(academics:Academics){
    console.log("Post Academics method");
    console.log(academics)
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/addAcademics", academics);
  }
}
