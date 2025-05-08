import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workout } from '../models/workout.model';
import { Workoutrequest } from '../models/workoutrequest.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http:HttpClient) { }
  
// Fetch all workouts
getAllWorkouts(): Observable<Workout[]> {
  return this.http.get<Workout[]>(`${environment.backendUrl}/workouts/getAllWorkouts`, {
    headers: this.getAuthHeaders()
  });
}

// Get workout by ID
getWorkoutById(id: string): Observable<Workout> {
  return this.http.get<Workout>(`${environment.backendUrl}/workouts/getWorkoutById/${id}`, {
    headers: this.getAuthHeaders()
  });
}

// Add new workout
addWorkout(workout: Workout): Observable<Workout> {
  return this.http.post<Workout>(`${environment.backendUrl}/workouts/addWorkout`, workout, {
    headers: this.getAuthHeaders()
  });
}

// Update workout
updateWorkout(id: string, workout: Workout): Observable<Workout> {
  return this.http.put<Workout>(`${environment.backendUrl}/workouts/updateWorkout/${id}`, workout, {
    headers: this.getAuthHeaders()
  });
}

// Delete workout
deleteWorkout(id: string): Observable<void> {
  return this.http.delete<void>(`${environment.backendUrl}/workouts/deleteWorkout/${id}`, {
    headers: this.getAuthHeaders()
  });
}

//getAppliedWorkouts
getAppliedWorkouts(id:string):Observable<Workoutrequest[]>{
  return this.http.get<Workoutrequest[]>(`${environment.backendUrl}/workoutRequests/user/${id}`,{
    headers:this.getAuthHeaders()
  })
}

// Helper: Attaches JWT token to headers
private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}
}

