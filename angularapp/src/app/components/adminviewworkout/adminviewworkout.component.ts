import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';
declare let bootstrap: any;

@Component({
  selector: 'app-adminviewworkout',
  templateUrl: './adminviewworkout.component.html',
  styleUrls: ['./adminviewworkout.component.css']
})
export class AdminviewworkoutComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  paginatedWorkouts: Workout[] = [];
  searchTerm: string = '';
  selectedWorkoutId: string | null = null;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  columnSettings = [
    { key: 'name', label: 'Workout Name', visible: true },
    { key: 'description', label: 'Description', visible: true },
    { key: 'difficultyLevel', label: 'Difficulty Level', visible: true },
    { key: 'targetArea', label: 'Target Area', visible: true },
    { key: 'daysPerWeek', label: 'Days Per Week', visible: true },
    { key: 'duration', label: 'Duration (Minutes)', visible: true },
    { key: 'createdAt', label: 'Created At', visible: true },
    { key: 'action', label: 'Action', visible: true }
  ];

  constructor(private readonly workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (data) => {
        console.log('Fetched workouts:', data);
        this.workouts = Array.isArray(data) ? data:[];
        this.filteredWorkouts = [...this.workouts];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to fetch workouts', err);
        this.workouts=[];
        this.filteredWorkouts=[];
        this.updatePagination();
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
    this.currentPage = 1;
    this.updatePagination();
  }

  isColumnVisible(key: string): boolean {
    return this.columnSettings.find(col => col.key === key)?.visible || false;
  }

  getVisibleColumnCount(): number {
    return this.columnSettings.filter(col => col.visible).length + 1; // +1 for S.No column
  }

  // Pagination methods
  updatePagination(): void {
    this.filteredWorkouts=Array.isArray(this.filteredWorkouts)? this.filteredWorkouts:[];

    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
    this.currentPage=Math.max(1,Math.min(this.currentPage,this.totalPages))
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
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
