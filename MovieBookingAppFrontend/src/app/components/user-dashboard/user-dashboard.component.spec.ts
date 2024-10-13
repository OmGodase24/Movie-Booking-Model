import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDashboardComponent } from './user-dashboard.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

fdescribe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let movieService: MovieBookingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [MovieBookingService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieBookingService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all movies on initialization', () => {
    const mockMovies = {
      data: { movies: [{ title: 'Movie 1' }, { title: 'Movie 2' }] },
    };

    spyOn(movieService, 'getAllMoviesU').and.returnValue(of(mockMovies));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.movies.length).toBe(2);
    expect(component.movies[0].title).toEqual('Movie 1');
  });

  it('should handle error when fetching all movies', () => {
    spyOn(movieService, 'getAllMoviesU').and.returnValue(throwError('Error'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.movies.length).toBe(0);
  });

  it('should search movie by name', () => {
    const mockMovie = {
      data: { movie: { title: 'Test Movie', genre: 'Action' } },
    };

    spyOn(movieService, 'searchMovieByName').and.returnValue(of(mockMovie));

    component.movieName = 'Test Movie';
    component.searchMovie();
    fixture.detectChanges();

    expect(component.searchResult.title).toEqual('Test Movie');
  });

  it('should open and close modal for booking', () => {
    component.openModal('Test Movie', 'Test Theatre');
    expect(component.isModalOpen).toBe(true);
    expect(component.selectedMovie).toBe('Test Movie');
    expect(component.theatre).toBe('Test Theatre');

    component.closeModal();
    expect(component.isModalOpen).toBe(false);
  });

  it('should book ticket successfully', () => {
    spyOn(movieService, 'bookTicket').and.returnValue(of({}));
    spyOn(component, 'getAllMovies');

    component.selectedMovie = 'Test Movie';
    component.seatNumber = 'A1';
    component.bookTicket();

    expect(component.successMessage).toBe('Ticket booked successfully'); // Check successMessage instead of ticketStatus
    expect(component.isModalOpen).toBe(false);
    expect(component.getAllMovies).toHaveBeenCalled();
});


  it('should handle error when booking ticket', () => {
    spyOn(movieService, 'bookTicket').and.returnValue(throwError('Error'));

    component.selectedMovie = 'Test Movie';
    component.seatNumber = 'A1';
    component.bookTicket();

    expect(component.ticketStatus).toBe('Cannot book: ticket already booked');
  });

  it('should cancel ticket successfully', () => {
    spyOn(movieService, 'cancelTicket').and.returnValue(of({}));
    spyOn(component, 'getAllMovies');

    component.cancelTicket('A1', 'Test Movie');

    expect(component.getAllMovies).toHaveBeenCalled();
  });
});
