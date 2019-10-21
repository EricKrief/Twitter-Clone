import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  pageNotFoundError = 'The page you are looking for was not found!';
  constructor() { }

  ngOnInit() {
  }

}
