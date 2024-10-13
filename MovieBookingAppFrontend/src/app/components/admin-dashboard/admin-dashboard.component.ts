import { Component, OnInit } from '@angular/core';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { Movie } from '../movie.model'; // Ensure the model is properly defined

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  movies: Movie[] = []; // Movies list
  movieForm: Movie = {} as Movie; // Movie form for add/edit
  isEdit: boolean = false; // Flag for add/edit mode
  errorMessage:string='';

  constructor(private movieBookingService: MovieBookingService) { }

  ngOnInit(): void {
    this.loadMovies(); // Fetch movies when the component initializes
  }

  // Load all movies from the service
  loadMovies(): void {
    this.movieBookingService.getAllMovies().subscribe(
      response => {
        this.movies = response.data.movies; // Load the movies data
      },
      error => {
        this.errorMessage = 'Error fetching movies'; // Set error message on error
        console.error('Error fetching movies:', error);
      }
    );
  }

  // Open the modal for adding or editing a movie
  openMovieModal(movie?: Movie): void {
    this.isEdit = !!movie; // If movie is provided, it's edit mode
    this.movieForm = movie
      ? { ...movie } // Copy existing movie details for editing
      : { // Initialize a new movie for adding
        title: '',
        genre: '',
        rating: 0,
        releaseDate: new Date(),
        theatre: '',
        ticketsAvailable: 0
      };

    // Show modal
    const modal = document.getElementById('movieModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Close the modal
  closeMovieModal(): void {
    const modal = document.getElementById('movieModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  // Save (add/edit) movie
  saveMovie(): void {
    if (this.isEdit) { // If editing
      if (this.movieForm._id) {
        this.movieBookingService.updateMovie(this.movieForm._id, this.movieForm).subscribe(
          response => {
            console.log('Movie updated:', response);
            this.loadMovies(); // Reload the movies
            this.closeMovieModal();
          },
          error => {
            console.error('Error updating movie:', error);
            this.errorMessage = 'Error creating movie'; // Set error message
          }
        );
      }
    } else { // If adding new movie
      this.movieBookingService.createMovie(this.movieForm).subscribe(
        response => {
          console.log('Movie created:', response);
          this.loadMovies(); // Reload the movies
          this.closeMovieModal();
        },
        error => {
          console.error('Error creating movie:', error);
          this.errorMessage = 'Error creating movie'; // Set error message
        }
      );
    }
  }

  // Delete a movie by ID
  deleteMovie(movieId: string): void {
    this.movieBookingService.deleteMovie(movieId).subscribe(response => {
      console.log('Movie deleted:', response);
      this.loadMovies(); // Reload the movies after deletion
    },error => {
      console.error('Error deleting movie:', error);
      this.errorMessage = 'Error deleting movie'; // Set error message
    });
  }
}
