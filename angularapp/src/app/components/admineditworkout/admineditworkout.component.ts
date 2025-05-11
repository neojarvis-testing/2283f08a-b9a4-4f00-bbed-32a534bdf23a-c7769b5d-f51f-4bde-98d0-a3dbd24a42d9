import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutService } from 'src/app/services/workout.service';
declare let bootstrap: any;

@Component({
  selector: 'app-admineditworkout',
  templateUrl: './admineditworkout.component.html',
  styleUrls: ['./admineditworkout.component.css']
})
export class AdmineditworkoutComponent implements OnInit {
  workoutForm!: FormGroup;
  workoutId: string | null = null;
  submitted = false;
  errorMessage = '';
  workouts:Workout[]=[]
  constructor(private readonly fb: FormBuilder, private readonly workoutservice: WorkoutService, private readonly route: ActivatedRoute) {
    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: [0, Validators.required],
      targetArea: ['', Validators.required],
      daysPerWeek: [0, [Validators.required,this.daysPerWeekValidator]],
      averageWorkoutDurationInMinutes: [0, Validators.required]
    });
  }
  daysPerWeekValidator(control:AbstractControl):ValidationErrors|null{
    const value=control.value;
    if(value<1||value>7){
      return {invalidDaysPerWeek:true}
    }
    return null
  }
  ngOnInit(): void {
    this.workoutId = this.route.snapshot.params['id']
    this.loadWorkoutDetails(this.workoutId);
  }

  loadWorkoutDetails(workoutId: string) {
    this.workoutservice.getWorkoutById(workoutId).subscribe((data) => {
      this.workoutForm.patchValue(data);
    });
  }
  get f() {
    return this.workoutForm.controls;
  }

  updateWorkout(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.workoutForm.invalid) {
      const anyTouched = Object.values(this.workoutForm.controls).some(control => control.touched);
      if (!anyTouched) {
        this.errorMessage = 'All fields are required'
      } else {
        Object.values(this.workoutForm.controls).forEach(control => control.markAsTouched());
      }
      return;
    }
    const workoutData={...this.workoutForm.value}
    this.workoutservice.updateWorkout(this.workoutId,workoutData).subscribe((data)=>{
      this.workouts.push(data)
      this.workoutForm.reset();
        this.submitted = false;
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    })
  }
}