import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Movie } from '../movie.model'; // Import the Movie interface

fdescribe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let movieService: MovieBookingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [MovieBookingService],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieBookingService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all movies on initialization', () => {
    const mockMovies = {
      data: { movies: [{ title: 'Admin Movie 1', genre: 'Drama', rating: 5, releaseDate: new Date(), theatre: 'Main', ticketsAvailable: 50 }] },
    };

    spyOn(movieService, 'getAllMovies').and.returnValue(of(mockMovies));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toEqual('Admin Movie 1');
  });

  it('should handle error when fetching all movies', () => {
    spyOn(movieService, 'getAllMovies').and.returnValue(throwError('Error'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.movies.length).toBe(0);
    expect(component.errorMessage).toEqual('Error fetching movies'); // Check for error message
  });

  it('should create a movie successfully', () => {
    const mockMovie: Movie = {
      title: 'New Movie',
      genre: 'Action',
      rating: 5,
      releaseDate: new Date(),
      theatre: 'Main Theatre',
      ticketsAvailable: 100
    };

    spyOn(movieService, 'createMovie').and.returnValue(of(mockMovie));
    spyOn(component, 'loadMovies').and.callThrough(); // Correctly spy on loadMovies

    component.movieForm = mockMovie; // Update to movieForm
    component.saveMovie(); // Call saveMovie instead of createMovie

    expect(component.movieForm).toEqual(mockMovie);
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should handle error when creating a movie', () => {
    spyOn(movieService, 'createMovie').and.returnValue(throwError('Error'));

    component.saveMovie(); // Call saveMovie instead of createMovie

    expect(component.errorMessage).toEqual('Error creating movie'); // Add error message check
  });

  it('should delete a movie successfully', () => {
    spyOn(movieService, 'deleteMovie').and.returnValue(of({}));
    spyOn(component, 'loadMovies').and.callThrough(); // Correctly spy on loadMovies

    component.deleteMovie('1');

    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should handle error when deleting a movie', () => {
    spyOn(movieService, 'deleteMovie').and.returnValue(throwError('Error'));

    component.deleteMovie('1');

    expect(component.errorMessage).toEqual('Error deleting movie'); // Check for error message
  });
});
