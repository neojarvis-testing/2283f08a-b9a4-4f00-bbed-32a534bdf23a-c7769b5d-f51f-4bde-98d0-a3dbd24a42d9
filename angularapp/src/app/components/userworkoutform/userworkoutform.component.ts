import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkoutrequestService } from 'src/app/services/workoutrequest.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-userworkoutform',
  templateUrl: './userworkoutform.component.html',
  styleUrls: ['./userworkoutform.component.css']
})
export class UserworkoutformComponent implements OnInit {

  @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  submitted = false;
  errorMessage = '';
  workoutId: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: WorkoutrequestService,
    private readonly route: ActivatedRoute
  ) {
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
    if (this.form.invalid) {
      const anyTouched = Object.values(this.form.controls).some(control => control.touched);
      if (!anyTouched) {
        this.errorMessage = '*All fields are required';
      } else {
        Object.values(this.form.controls).forEach(control => control.markAsTouched());
      }
      return;
    }

    const userId = localStorage.getItem('id');
    this.service.addWorkoutRequest({ ...this.form.value, userId, workoutId: this.workoutId }).subscribe({
      next: () => {
        this.form.reset();
        this.submitted = false;
        const modal = new bootstrap.Modal(this.successModal.nativeElement);
        modal.show();
      },
      error: () => {
        alert('Something went wrong');
      }
    });
  }
}