import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workoutrequest } from '../models/workoutrequest.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutrequestService {
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  addWorkoutRequest(data: Partial<Workoutrequest>): Observable<Workoutrequest> {
    return this.http.post<Workoutrequest>(
      `${this.baseUrl}/workoutRequests/addWorkoutRequest`,data,
      { headers: this.getAuthHeaders() }
    );
  }

  getAppliedWorkouts(userId: string): Observable<Workoutrequest[]> {
    return this.http.get<Workoutrequest[]>(
      `${this.baseUrl}workoutRequests/${userId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteWorkoutApplication(requestedId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/workoutRequests/${requestedId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getAllWorkoutRequests(): Observable<Workoutrequest[]> {
    return this.http.get<Workoutrequest[]>(
      `${this.baseUrl}/workoutRequests/getAllWorkoutRequests`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateWorkoutStatus(id: string, workoutApplication: Workoutrequest): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/workoutRequests/update/${id}`,
      workoutApplication,
      { headers: this.getAuthHeaders() }
    );
  }
}
