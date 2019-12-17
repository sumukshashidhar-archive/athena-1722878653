import { AuthService } from 'src/app/auth/auth.service';
import { InterestSendingService } from './../../../shared/interests/interest-sending.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {EventService} from '../../../shared/events/event.service';
export let bio;
@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {
  // interest: string;
  // interests = [];

  config = {

    search: true,
    height: 'auto',
    placeholder: 'Select',
      displayKey: 'catName'

  };

    configSubCat = {

        search: true,
        height: 'auto',
        placeholder: 'Select',
        displayKey: 'subCatName'

    };
    subCatName: any;
  categoryOption: any;
  subcatOptions: any;
  noOfChoice = new Array<string>() ;


  constructor(public interestsendingservice: InterestSendingService, public auth: AuthService, private catService: EventService) {

      this.noOfChoice.push('1');
  }
  // onClick() {
  //   this.interests.push({
  //     name: this.interest
  //   });
  //   this.interest = "";



  logout() {
    this.auth.logout();
  }
  onSubmit(form: NgForm) {
  bio = (form.value.bio);
  console.log(bio);
  this.interestsendingservice.postInterest(form.value).subscribe(
      res => {
        console.log('Auth is successful');
        console.log(res);
      },
      err => {
        console.log('ERROR');
      }
    );
  }
  ngOnInit() {

    this.getAllCategory();
  }

  getAllCategory() {

     this.catService.getcategoryDetails().subscribe(res => {
     this.categoryOption = res;
     console.log(this.categoryOption);
     });
  }


  selectionChanged(event) {
      this.subCatName = null;
    console.log(event);
    this.catService.getSubCategory(event.value.catId).subscribe(res => {
       this.subcatOptions = res;
    });
  }

    adduserInterestList() {

      let arr =[];
      for (let i=0; i < this.subCatName.length; i++) {
          arr.push(this.subCatName[i].subCatName);
      }

      this.catService.postUserInterest(arr).subscribe(res =>{
           console.log('done');
           this.subCatName = null;
           alert('User Interest added');

      });



    }
}
