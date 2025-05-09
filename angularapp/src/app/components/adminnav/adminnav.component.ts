import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  userName: string;

  constructor() { }

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');

  }
  

}
