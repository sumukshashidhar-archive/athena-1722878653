import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-keyadd',
  templateUrl: './keyadd.component.html',
  styleUrls: ['./keyadd.component.css']
})
export class KeyaddComponent implements OnInit {
  
  constructor(private Auth: AuthService, private http:HttpClient) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
   console.log(form.value)
   this.http.post('http://localhost:3000/ba01ac51de2e64b87861e99c833ba6b1b2262aff68a4f21cffa307eb29eddcc3',form.value)
   
}

}
