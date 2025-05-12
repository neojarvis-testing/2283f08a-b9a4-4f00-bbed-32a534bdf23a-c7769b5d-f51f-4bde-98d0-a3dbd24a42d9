import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/login`, login).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('id', response.id);
        localStorage.setItem('userName', response.userName);
      })
    );
  }
  
  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/signup`, user);
  }



}