import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model = {
    email: '',
    password: ''
  };
  submitted = false;
  loginError: string = '';

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) return;

    const { email, password } = this.model;
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.showSuccessModal();
      },
      error: (error) => {
        this.loginError = 'Invalid Email or Password';
              }
    });
  }

  showSuccessModal() {
    const modal = new bootstrap.Modal(document.getElementById('successModal')!);
    modal.show();
  }

  ngOnInit(): void {
    localStorage.clear();
  }
}
