import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http:HttpClient) { }
  addWorkout(workout: any): Observable<any> {
    return this.http.post(`${environment.backendUrl}/workouts`, workout);
  }
  getAllWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/workouts`);
  }
  
  deleteWorkout(id: string): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/workouts/${id}`);
  }
}
