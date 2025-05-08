import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]],
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
    this.showSuccessModal()
    const userData: User = {
      userName: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.mobile,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmpassword,
      role: this.signupForm.value.role,
    };
    this.authService.signup(userData).subscribe();
  }
  showSuccessModal(){
    const modal= new bootstrap.Modal(document.getElementById('successModal')!);
    modal.show();
  }


  ngOnInit(): void {
  }

}




