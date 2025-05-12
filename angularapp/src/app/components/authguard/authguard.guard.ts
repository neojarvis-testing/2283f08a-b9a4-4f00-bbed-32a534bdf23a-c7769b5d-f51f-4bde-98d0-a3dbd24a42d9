import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private readonly router: Router) { }
  canActivate():boolean{
      const token = localStorage.getItem('token'); 
      if (token) {
        const role=localStorage.getItem('role')
        if(role==='User'){
          return true;
        }
        else{
          return false
        }
        
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
  }
  
}
