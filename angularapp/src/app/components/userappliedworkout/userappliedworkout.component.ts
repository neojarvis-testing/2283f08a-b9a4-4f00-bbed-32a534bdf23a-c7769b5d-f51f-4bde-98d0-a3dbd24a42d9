import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workoutrequest } from 'src/app/models/workoutrequest.model';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
declare var bootstrap:any;

@Component({
  selector: 'app-userappliedworkout',
  templateUrl: './userappliedworkout.component.html',
  styleUrls: ['./userappliedworkout.component.css']
})
export class UserappliedworkoutComponent implements OnInit {
  userId: string;
  workoutRequests: Workoutrequest[] = [];
  filteredRequests: Workoutrequest[] = [];
  filterStatus: string = '';
  searchTerm: string = '';
  selectedWorkoutId:string|null=null;

  constructor(private service: WorkoutrequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      console.log("inside if");
      this.service.getAppliedWorkouts(this.userId).subscribe({
        next: (data) => {
          console.log(data);
          this.workoutRequests = data;
          this.filteredRequests = data;
        },
        error: (err) => {
          console.error('Error fetching workout requests:', err);
        }
      });
    }
  }
  
  applyFilters(): void {
    this.filteredRequests = this.workoutRequests.filter(w =>
      (!this.filterStatus || w.requestStatus === this.filterStatus) &&
      (!this.searchTerm ||
        w.workoutId?.workoutName?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  openDeleteModal(id:string):void{
    this.selectedWorkoutId=id;
    const modalElement=document.getElementById('deleteModal');
    if(modalElement){
      const modal=new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  confirmDelete(): void {
    if (!this.selectedWorkoutId) return;

    this.service.deleteWorkoutApplication(this.selectedWorkoutId).subscribe({
      next: () => {
        this.workoutRequests = this.workoutRequests.filter(w => w._id !== this.selectedWorkoutId);
        this.filteredRequests = this.workoutRequests;
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