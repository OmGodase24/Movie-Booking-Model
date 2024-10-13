import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private service: MovieBookingService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.service.storeToken(response.token);

          // Decode token to extract role
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          const role = payload.role; // Get role from token
          console.log(role);

          sessionStorage.setItem('email', this.loginForm.value.email);
          sessionStorage.setItem('role', role); // Store role in sessionStorage

          console.log(sessionStorage);

          if (role === 'admin') {
            Swal.fire('WELCOME ADMIN');
            this.router.navigate(['/admin/dashboard']);
          } else {
            Swal.fire('WELCOME');
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login failed';
        }
      });
    }
  }
}
