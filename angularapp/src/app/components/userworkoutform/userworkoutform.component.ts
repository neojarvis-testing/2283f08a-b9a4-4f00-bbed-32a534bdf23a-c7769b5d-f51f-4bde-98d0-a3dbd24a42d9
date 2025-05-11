import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
declare let bootstrap: any;

@Component({
  selector: 'app-userworkoutform',
  templateUrl: './userworkoutform.component.html',
  styleUrls: ['./userworkoutform.component.css']
})
export class UserworkoutformComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  errorMessage = '';
  workoutId: string | null = null;
   
  constructor(private readonly fb: FormBuilder, private readonly service: WorkoutrequestService, private readonly route: ActivatedRoute) {
    this.form = this.fb.group({
      age: ['', Validators.required],
      bmi: ['', Validators.required],
      gender: ['', Validators.required],
      dietaryPreferences: ['', Validators.required],
      medicalHistory: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.workoutId = this.route.snapshot.params['id'];
  }
  
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid){
      const anyTouched=Object.values(this.form.controls).some(control=>control.touched);
      if(!anyTouched){
        this.errorMessage='*All fields are required'
      }else{
        Object.values(this.form.controls).forEach(control=>control.markAsTouched());
      }
     
      return;
    
    } 
    const userId = localStorage.getItem('id');
    this.service.addWorkoutRequest({...this.form.value, userId, workoutId: this.workoutId}).subscribe({
      next: () => {
        this.form.reset();
        this.submitted = false;
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
      },
      error:()=>{
        alert('Something went wrong');
      }
    });

 
  }
}
