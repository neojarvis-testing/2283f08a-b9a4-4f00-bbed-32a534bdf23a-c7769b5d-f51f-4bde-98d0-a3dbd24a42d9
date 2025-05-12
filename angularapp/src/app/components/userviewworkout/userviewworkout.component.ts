import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
declare let bootstrap:any;

@Component({
  selector: 'app-userviewworkout',
  templateUrl: './userviewworkout.component.html',
  styleUrls: ['./userviewworkout.component.css']
})
export class UserviewworkoutComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  paginatedWorkouts: Workout[] = [];
  searchTerm: string = '';
  selectedWorkoutId: string | null = null;
  appliedWorkouts: Set<string> = new Set();
  userId:string

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  maxVisiblePages: number = 5;


  constructor(private readonly workoutService: WorkoutService,private readonly workoutRequest:WorkoutrequestService) { }

  ngOnInit(): void {
    this.userId= localStorage.getItem('id');
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (data) => {
        console.log('Fetched workouts:', data);
        this.workouts = data;
        this.filteredWorkouts = [...data];
        this.getAppliedWorkouts(this.userId)
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to fetch workouts', err);
      }
    });
  }
  getAppliedWorkouts(userId: string | null): void {
    if (!userId) return;

    this.workoutRequest.getAppliedWorkouts(userId).subscribe({
        next: (appliedWorkouts) => {
            this.appliedWorkouts = new Set(appliedWorkouts.map(workout => workout.workoutId._id));
        },
        error: (err) => {
            console.error('Failed to fetch applied workouts', err);
        }
    });
}


  openDeleteModal(id: string): void {
    this.selectedWorkoutId = id;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete(): void {
    if (!this.selectedWorkoutId) return;

    this.workoutService.deleteWorkout(this.selectedWorkoutId).subscribe({
      next: () => {
        this.workouts = this.workouts.filter(w => w._id !== this.selectedWorkoutId);
        this.filteredWorkouts = this.workouts;
        this.updatePagination();
        this.selectedWorkoutId = null;
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal?.hide();
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert('Failed to delete workout.');
      }
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.workoutName.toLowerCase().includes(term) ||
      workout.description.toLowerCase().includes(term)
    );
    this.currentPage = 1; // Reset to first page when searching
    this.updatePagination();
  }



  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  getPages(): number[] {
    const pages: number[] = [];
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    let endPage = startPage + this.maxVisiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}