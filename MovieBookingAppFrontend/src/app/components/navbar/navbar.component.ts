// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  email: string | null = null;
  userRole: string | null = null;

  constructor(private router: Router, private service: MovieBookingService) {}

  ngOnInit(): void {
    // Subscribe to email and role changes
    this.service.getEmail().subscribe((email) => {
      this.email = email;
    });
    this.service.getUserRole().subscribe((role) => {
      this.userRole = role;
    });
  }

  onLogout(): void {
    this.service.logout();
  }
}
