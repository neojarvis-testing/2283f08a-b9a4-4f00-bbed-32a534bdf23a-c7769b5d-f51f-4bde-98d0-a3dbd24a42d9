import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';
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

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getAllWorkouts().subscribe({
     next:(data)=>{
       console.log('Fetched workouts:',data);
       this.workouts=data;
       this.filteredWorkouts=data
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
 }


