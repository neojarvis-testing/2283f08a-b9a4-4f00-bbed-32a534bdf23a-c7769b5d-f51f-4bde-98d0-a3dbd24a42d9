import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/workout.service';
declare var bootstrap: any;


@Component({
  selector: 'app-adminaddworkout',
  templateUrl: './adminaddworkout.component.html',
  styleUrls: ['./adminaddworkout.component.css']
})
export class AdminaddworkoutComponent implements OnInit {
  workoutForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {
    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: [0, Validators.required],
      targetArea: ['', Validators.required],
      daysPerWeek: [0,[Validators.required,this.daysPerWeekValidator]],
      averageWorkoutDurationInMinutes: [0, Validators.required]
    });
  }
   daysPerWeekValidator(control:AbstractControl):ValidationErrors|null{
    const value=control.value;
    if(value<1 || value>7){
      return {invalidDaysPerWeek:true};
    }
    return null;
   }

  ngOnInit(): void {
    
  }

  get f() {
    return this.workoutForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.workoutForm.invalid){
      const anyTouched=Object.values(this.workoutForm.controls).some(control=>control.touched);
      if(!anyTouched){
        this.errorMessage='All fields are required'
      }else{
        Object.values(this.workoutForm.controls).forEach(control=>control.markAsTouched());
      }
     
      return;
    
    } 

    this.workoutService.addWorkout(this.workoutForm.value).subscribe({
      next: () => {
        this.workoutForm.reset();
        this.submitted = false;
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
      },
      error: (err) => {
        if (err?.error?.message === 'Workout with the same name already exists') {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong';
        }
      }
    });
  }

}

