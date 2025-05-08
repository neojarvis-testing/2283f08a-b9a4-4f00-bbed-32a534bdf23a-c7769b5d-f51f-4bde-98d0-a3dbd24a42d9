import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError: string = '';
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]]
    })

  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.showSuccessModal()
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
