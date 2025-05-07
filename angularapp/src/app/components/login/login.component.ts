import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
submitted=false;
loading=false;
loginError='';
  constructor(private fb: FormBuilder,private router:Router,private authService: AuthService) { 
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
  })

  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    this.loginError = '';

    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response?.user && response?.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          
          const redirectPath = response.user.role === 'Admin' ? '/adminnav' : '/usernav';
          this.router.navigate([redirectPath]);
        }
      },
      error: (error) => {
        this.loading = false;
        this.loginError = error.error?.message || 'Invalid Email or Password';
        console.error('Login error:', error);
      }
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

}
