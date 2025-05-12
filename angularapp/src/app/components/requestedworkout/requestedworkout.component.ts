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
  paginatedRequests: Workoutrequest[] = [];
  selectedWorkout: Workoutrequest | null = null;
  filterStatus: string = '';
  searchTerm: string = '';
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private readonly workoutService: WorkoutrequestService) { }

  ngOnInit(): void {
    this.fetchAllWorkouts();
  }

  fetchAllWorkouts(): void {
    this.workoutService.getAllWorkoutRequests().subscribe({
      next: (data) => {
        this.workoutRequests = data;
        this.filteredRequests = data;
        this.updatePagination();
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
    this.currentPage = 1;
    this.updatePagination();
  }

  approveRequest(id: string): void {
    const request = this.filteredRequests.find(r => r._id === id);
    if (request) {
      request.requestStatus = 'Approved';
    }
  
    this.workoutService.updateWorkoutStatus(id, { requestStatus: 'Approved' } as Workoutrequest).subscribe(() => {
      this.fetchAllWorkouts();
    });
  }
  
  rejectRequest(id: string): void {
    const request = this.filteredRequests.find(r => r._id === id);
    if (request) {
      request.requestStatus = 'Rejected';
    }
  
    this.workoutService.updateWorkoutStatus(id, { requestStatus: 'Rejected' } as Workoutrequest).subscribe(() => {
      this.fetchAllWorkouts();
    });
  }

  showDetails(workout: Workoutrequest): void {
    this.selectedWorkout = workout;
    const modalElement = document.getElementById('detailsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5; // Maximum number of page numbers to show
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last and pages around current page
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }
}