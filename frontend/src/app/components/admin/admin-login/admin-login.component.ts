import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from './../../../shared/admin/admin.service'

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"]
})
export class AdminLoginComponent implements OnInit {
  
  constructor(public adminService:AdminService) {}

  ngOnInit() {}

  onSubmit(form: NgForm){
    this.adminService.postAdmin(form.value).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
}
