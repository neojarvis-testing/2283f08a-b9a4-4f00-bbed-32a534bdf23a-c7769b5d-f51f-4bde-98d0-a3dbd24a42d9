import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workoutrequest } from 'src/app/models/workoutrequest.model';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
declare let bootstrap: any;

@Component({
  selector: 'app-userappliedworkout',
  templateUrl: './userappliedworkout.component.html',
  styleUrls: ['./userappliedworkout.component.css']
})
export class UserappliedworkoutComponent implements OnInit {
  userId: string;
  workoutRequests: Workoutrequest[] = [];
  filteredRequests: Workoutrequest[] = [];
  paginatedRequests: Workoutrequest[] = [];
  filterStatus: string = '';
  searchTerm: string = '';
  selectedWorkoutId: string | null = null;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  maxVisiblePages: number = 5;

  constructor(private readonly service: WorkoutrequestService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.service.getAppliedWorkouts(this.userId).subscribe({
        next: (data) => {
          this.workoutRequests = data;
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error fetching workout requests:', err);
        }
      });
    }
  }

  applyFilters(): void {
    // Apply filters
    this.filteredRequests = this.workoutRequests.filter(w =>
      (!this.filterStatus || w.requestStatus === this.filterStatus) &&
      (!this.searchTerm ||
        w.workoutId?.workoutName?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );

    // Reset to first page when filters change
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    // Adjust if we're at the end
    if (endPage - startPage + 1 < this.maxVisiblePages) {
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
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

    this.service.deleteWorkoutApplication(this.selectedWorkoutId).subscribe({
      next: () => {
        this.workoutRequests = this.workoutRequests.filter(w => w._id !== this.selectedWorkoutId);
        this.applyFilters(); // This will update both filtered and paginated requests
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
}