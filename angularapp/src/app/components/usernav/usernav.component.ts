import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  userId:string
  userName:string
  constructor() { }

  ngOnInit(): void {
    this.userId=localStorage.getItem('id');
    this.userName=localStorage.getItem('userName');
  }

}
