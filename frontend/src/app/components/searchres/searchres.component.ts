import { Component, OnInit } from '@angular/core';
import { Search } from '../../shared/search/search.model'
import { DatasharingService } from '../../shared/search/datasharing.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-searchres',
  templateUrl: './searchres.component.html',
  styleUrls: ['./searchres.component.css']
})
export class SearchresComponent implements OnInit {

  constructor(public data: DatasharingService, private router: Router) { }

  ngOnInit() {
  }

}
