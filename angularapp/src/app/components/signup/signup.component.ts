import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('successModal') successModal!: ElementRef;

  submitted = false;
  user: User = {
    userName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  constructor(private readonly authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    
    if (form.invalid || this.user.password !== this.user.confirmPassword) {
      return;
    }

    this.showSuccessModal();
    this.authService.register(this.user).subscribe();
  }

  showSuccessModal() {
    const modal = new bootstrap.Modal(this.successModal.nativeElement);
    modal.show();
  }
}




