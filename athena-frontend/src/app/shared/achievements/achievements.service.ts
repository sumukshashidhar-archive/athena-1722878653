import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Achievements } from "./achievements.model";

@Injectable({
  providedIn: "root"
})
export class AchievementsService {
  selectedAchievements: Achievements = {
    uploadedFiles: [], 
    achCat: "",
    achSubCat: "" ,
    description:"",
    rank:""
  };
  
  achievements: Achievements[];

  constructor(private http: HttpClient) {}

  postAchievements(ach: Achievements) {
    console.log("Post achievements method");
    console.log(ach);
    return this.http.post("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/achievements", ach);
  }

  getAchievements() {
    return this.http.get("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/achievements");
  }

  deleteAchievement(_id: string) {
    return this.http.delete("http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/delete-achievement")
  }
}
