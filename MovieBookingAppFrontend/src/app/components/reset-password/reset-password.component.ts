import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;
  successMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: MovieBookingService,
    private _router : Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const password = this.resetPasswordForm.value.password;

    this.service.resetPassword(this.token, password).subscribe(
      response => {
        this.successMessage = 'Password reset successful!';
        this.resetPasswordForm.reset();
        this._router.navigate(['/login'])        
      },
      error => {
        this.successMessage = 'Error resetting password. Please try again later.';
      }
    );
  }
}
