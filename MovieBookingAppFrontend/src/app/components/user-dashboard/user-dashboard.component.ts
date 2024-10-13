import { Component, OnInit } from '@angular/core';
import { MovieBookingService } from 'src/app/services/movie-booking.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  successMessage: string = ''; // Initialize success message
  errorMessage: string = '';
  movies: any[] = [];
  searchResult: any;
  movieName: string = '';
  selectedMovie: any;
  ticketStatus: string = '';
  isModalOpen: boolean = false;
  seatNumber: string = ''; // Updated to allow user input
  theatre: string = ''; // Updated to allow user input

  constructor(private movieService: MovieBookingService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getAllMoviesU().subscribe(
      (response) => {
        this.movies = response.data.movies;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  searchMovie() {
    if (this.movieName.trim()) {
      this.movieService.searchMovieByName(this.movieName).subscribe(
        (response) => {
          this.searchResult = response.data.movie;
        },
        (error) => {
          console.error('Error searching movie:', error);
        }
      );
    }
  }

  // Open modal for booking
  openModal(movieName: string, theatre: string) {
    this.selectedMovie = movieName; // Get selected movie
    this.theatre = theatre; // Get selected theatre
    this.isModalOpen = true; // Open modal
    this.seatNumber = ''; // Reset seat number
  }

  closeModal() {
    this.isModalOpen = false;
    this.ticketStatus = '';
  }

  bookTicket() {
    const ticketData = { seatNumber: this.seatNumber, theatre: this.theatre }; // Use input values
    this.movieService.bookTicket(this.selectedMovie, ticketData).subscribe(
      (response) => {
        this.successMessage = 'Ticket booked successfully'; // Update success message
        alert(this.successMessage); // Alert the success message
        this.closeModal(); // Close modal after successful booking
        this.getAllMovies(); // Refresh the list of movies
      },
      (error) => {
        this.ticketStatus = 'Cannot book: ticket already booked';
        console.error('Error booking ticket:', error);
      }
    );
  }

  // Cancel a ticket
  cancelTicket(seatNumber: string, movieName: string) {
    this.movieService.cancelTicket(movieName, seatNumber).subscribe(
      (response) => {
        alert('Ticket cancelled successfully');
        this.getAllMovies(); // Refresh the list of movies
      },
      (error) => {
        console.error('Error canceling ticket:', error);
      }
    );
  }

}
