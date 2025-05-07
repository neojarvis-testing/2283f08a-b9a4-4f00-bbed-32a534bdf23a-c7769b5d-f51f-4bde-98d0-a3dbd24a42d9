import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentRoleSubject=new BehaviorSubject<string | null>(null);
  private currentUserSubject=new BehaviorSubject<string | null>(null);
  constructor(private http:HttpClient, private router:Router) { }
  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/login`, loginData).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = error.error?.message || 'Invalid credentials';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/signup`, user);
  }


  
}