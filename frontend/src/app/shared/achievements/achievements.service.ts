import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Achievements } from "./achievements.model";
import{uploadedFiles} from './../../components/students/achievements/achievements.component'
@Injectable({
  providedIn: "root"
})
export class AchievementsService {
  selectedAchievements: Achievements = {
    uploadedFiles: [], 
    achCat: "",
    achSubCat: "" 
  };
  
  achievements: Achievements[];

  constructor(private http: HttpClient) {}

  postAchievements(ach: Achievements) {
    console.log("Post achievements method");
    console.log(ach);
    return this.http.post("http://localhost:3000/achievements", ach);
  }

  getAchievements() {
    return this.http.get("http://localhost:3000/achievements");
  }

  deleteAchievement(_id: string) {
    return this.http.delete("http://localhost:3000/delete-achievement")
  }
}
