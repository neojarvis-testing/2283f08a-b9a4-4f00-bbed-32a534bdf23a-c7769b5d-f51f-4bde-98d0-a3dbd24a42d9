import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
isAdmin: boolean=false;
isUser: boolean=false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.checkUserRole();
  }
  checkUserRole() :boolean{
    const role=localStorage.getItem('role');
    this.isAdmin=role==='Admin'
    this.isUser=role==='User'
    return this.isAdmin || this.isUser;
  }

}
