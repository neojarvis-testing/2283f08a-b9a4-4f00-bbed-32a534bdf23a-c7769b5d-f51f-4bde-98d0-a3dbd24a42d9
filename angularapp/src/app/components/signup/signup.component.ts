import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  signupError = '';
  constructor(private  authService:AuthService, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.matchPasswords })

  }
  get f() {
    return this.signupForm.controls;
  }
  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) return;
    const userData: User = {
      userName: this.signupForm.value.username,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.mobile,
      password: this.signupForm.value.password,
      confirmpassword: this.signupForm.value.confirmpassword,
      role: this.signupForm.value.role,
    };

    this.authService.signup(userData).subscribe({
      next: () => {
        alert('User Registration is Successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });

  }



  ngOnInit(): void {
  }

}
