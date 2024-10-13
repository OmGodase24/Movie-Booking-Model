import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private service: MovieBookingService,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.service.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: (response) => {
          this.successMessage = 'Password reset email sent!';
          this.forgotPasswordForm.reset();

          setTimeout(() => {
            window.location.reload();
          }, 2000);

        },
        error: (error) => {
          this.successMessage = error.error.message || 'Error sending reset email';
        }
      });
    }
  }
}