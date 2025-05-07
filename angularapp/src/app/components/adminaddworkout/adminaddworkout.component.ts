import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-adminaddworkout',
  templateUrl: './adminaddworkout.component.html',
  styleUrls: ['./adminaddworkout.component.css']
})
export class AdminaddworkoutComponent implements OnInit {
  workoutForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['', Validators.required],
      targetArea: ['', Validators.required],
      daysPerWeek: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  get f() {
    return this.workoutForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.workoutForm.invalid) return;

    this.workoutService.addWorkout(this.workoutForm.value).subscribe({
      next: () => {
        alert('Successfully Added!');
        this.workoutForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (err.error?.message === 'Workout with the same name already exists') {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong';
        }
      }
    });
  }

}
