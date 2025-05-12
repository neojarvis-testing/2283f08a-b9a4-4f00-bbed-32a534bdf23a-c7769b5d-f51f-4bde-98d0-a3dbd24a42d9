import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class Authguard1Guard implements CanActivate {
  
  constructor(private readonly router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token'); 
    if (token) {
      const role=localStorage.getItem('role')
      if(role==='Admin'){
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
