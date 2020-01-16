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
    return this.http.post("http://localhost:3000/achievements",ach);
  }

  getAchievements() {
    return this.http.get("http://localhost:3000/achievements");
  }

  deleteAchievement(achId: string) {
    return this.http.post("http://localhost:3000/deleteAchievements",{achId})
  }

}
