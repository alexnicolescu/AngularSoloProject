import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toolbarTitle = 'Courseplanner2';

  constructor() { }

  ngOnInit(): void {
  }

}
