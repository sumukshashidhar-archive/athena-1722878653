import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Achievements } from '../shared/achievements/achievements.model';
import { AchievementsService } from '../shared/achievements/achievements.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  ach_list: any;

  constructor( private auth: AuthService,
    private router: Router,private http:HttpClient,public achService: AchievementsService) { }

  ngOnInit() {
    this.getAch()
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getAch(){
    this.achService.getAchievements().subscribe(res => {
      this.ach_list = res as Achievements[];
      console.log(this.ach_list);
    });
  }
}
