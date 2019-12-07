import { Component, OnInit } from "@angular/core";

import { AchievementsService } from "./../../../shared/achievements/achievements.service";
import { Achievements } from "./../../../shared/achievements/achievements.model";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LoadingComponent } from "./../../loading/loading.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.css"]
})
export class AchievementsComponent implements OnInit {
  uploadedFiles: Array < File > ;
  showSpinner: boolean = true;
  ach_list: any;
  url = '';
  fileChange(event) {
    this.uploadedFiles = event.target.files;
    console.log(this.uploadedFiles)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
      }
    }
  }
  constructor(private auth:AuthService,public achService: AchievementsService, private router: Router,private http: HttpClient) {}

  ngOnInit() {
    this.refreshAchievements();
  }
  
  onSubmit(form: NgForm) {
    console.log('UPLOAD METHOD');
    console.log(form.value)
    console.log(this.uploadedFiles);
    console.log(this.uploadedFiles[0]['name'])
    // var woohoo=this.uploadedFiles[0]['name'] 
    // console.log(woohoo)
    let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.http.post('http://localhost:3000/achievements', formData)
          .subscribe((response) => {
              console.log('response received is ', response);
          })
    this.achService.postAchievements(form.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        if (err.status === 422) {
          console.log(422);
        } else {
          console.log(err);
        }
        console.log("Error");
      }
    );
  }


  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  refreshAchievements() {
    this.achService.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      console.log(this.ach_list);
      this.showSpinner = false;
      console.log(
        "Show spinner is now false and we are in the refresh achievements method"
      );
    });
  }

  onDelete(_id: string) {
    if (confirm('Do you want to delete this record ?') == true) {
      console.log(_id)
      this.achService.deleteAchievement(_id).subscribe((res) => {
        this.refreshAchievements();
      })
    }
  }


//   fileChange(element) {
    // this.uploadedFiles = element.target.files;
// }

// upload() {
//   console.log('UPLOAD METHOD');
//   console.log(this.uploadedFiles);
//   let formData = new FormData();
//     for (var i = 0; i < this.uploadedFiles.length; i++) {
//         formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
//     }
//     this.http.post('http://localhost:3000/achievements', formData)
//         .subscribe((response) => {
//             console.log('response received is ', response);
//         })

// }

}


