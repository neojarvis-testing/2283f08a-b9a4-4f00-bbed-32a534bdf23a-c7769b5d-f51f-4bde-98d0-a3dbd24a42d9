import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
declare var bootstrap:any;

@Component({
  selector: 'app-userviewworkout',
  templateUrl: './userviewworkout.component.html',
  styleUrls: ['./userviewworkout.component.css']
})
export class UserviewworkoutComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  searchTerm: string = '';
  selectedWorkoutId:string|null=null;
  appliedWorkouts: Set<string> = new Set();
  userId:string

  constructor(private workoutService: WorkoutService,private workoutRequest:WorkoutrequestService) { }

  ngOnInit(): void {
    this.userId= localStorage.getItem('id');
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getAllWorkouts().subscribe({
     next:(data)=>{
       console.log('Fetched workouts:',data);
       this.workouts=data;
       this.filteredWorkouts=data
       this.getAppliedWorkouts(this.userId)
     },
     error: (err)=>{
       console.error('Failed to fetch workouts',err);
     }
    })
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
 
     this.workoutService.deleteWorkout(this.selectedWorkoutId).subscribe({
       next: () => {
         this.workouts = this.workouts.filter(w => w._id !== this.selectedWorkoutId);
         this.filteredWorkouts = this.workouts;
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
 }


