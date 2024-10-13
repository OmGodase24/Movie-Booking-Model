import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private service: MovieBookingService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      role: ['user', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.value,
        loginId: `${this.registerForm.get('firstName')?.value.toLowerCase()}${Date.now()}`,  // Generates loginId dynamically
      };

      this.service.register(formData).subscribe({
        next: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registered successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Please try Again!",
          });
        }
      });
    }
  }
}
