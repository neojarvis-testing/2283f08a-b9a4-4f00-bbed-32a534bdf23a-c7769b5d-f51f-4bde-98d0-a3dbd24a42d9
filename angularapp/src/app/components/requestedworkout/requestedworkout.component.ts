import { Component, OnInit } from '@angular/core';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
import { Workoutrequest } from 'src/app/models/workoutrequest.model';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-requestedworkout',
  templateUrl: './requestedworkout.component.html',
  styleUrls: ['./requestedworkout.component.css']
})
export class RequestedworkoutComponent implements OnInit {
  workoutRequests: Workoutrequest[] = [];
  filteredRequests: Workoutrequest[] = [];
  selectedWorkout: Workoutrequest | null = null;
  filterStatus: string = '';
  searchTerm: string = '';
  
  constructor(private workoutService: WorkoutrequestService) { }

  ngOnInit(): void {
    this.fetchAllWorkouts();
  }

  fetchAllWorkouts(): void {
    this.workoutService.getAllWorkoutRequests().subscribe({
      next: (data) => {
        this.workoutRequests = data;
        this.filteredRequests = data;
      },
      error: (err) => {
        console.error('Error fetching all workout requests:', err);
      }
    });
  }

  applyFilters(): void {
    this.filteredRequests = this.workoutRequests.filter(w =>
      (!this.filterStatus || w.requestStatus === this.filterStatus) &&
      (!this.searchTerm ||
        w.userId?.userName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        w.workoutId?.workoutName?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  approveRequest(id: string): void {
    const request = this.filteredRequests.find(r => r._id === id);
    if (request) {
      request.requestStatus = 'Approved'; // Update locally for UI
    }
  
    this.workoutService.updateWorkoutStatus(id, { requestStatus: 'Approved' } as Workoutrequest).subscribe(() => {
      this.fetchAllWorkouts(); // Refresh from backend
    });
  }
  
  rejectRequest(id: string): void {
    const request = this.filteredRequests.find(r => r._id === id);
    if (request) {
      request.requestStatus = 'Rejected'; // Update locally for UI
    }
  
    this.workoutService.updateWorkoutStatus(id, { requestStatus: 'Rejected' } as Workoutrequest).subscribe(() => {
      this.fetchAllWorkouts(); // Refresh from backend
    });
  }
  
  


  showDetails(workout: Workoutrequest): void {
    this.selectedWorkout = workout;
    const modal = new bootstrap.Modal(document.getElementById('detailsModal')!);
    modal.show();
  }
}
