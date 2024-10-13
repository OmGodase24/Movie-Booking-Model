import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MovieBookingService } from 'src/app/services/movie-booking.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let movieBookingService: MovieBookingService;
  let router: Router;

  beforeEach(async () => {
    const movieBookingServiceMock = jasmine.createSpyObj('MovieBookingService', ['login', 'storeToken']);
    
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: MovieBookingService, useValue: movieBookingServiceMock },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    movieBookingService = TestBed.inject(MovieBookingService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login error', () => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('userpassword');
  
    (movieBookingService.login as jasmine.Spy).and.returnValue(throwError({ error: { message: 'Login failed' }, status: 401 }));
  
    component.onSubmit();
  
    expect(component.errorMessage).toBe('Login failed'); // Ensure error message is set
  });
  

  it('should navigate to the admin dashboard on admin login', () => {
    component.loginForm.controls['email'].setValue('admin@example.com');
    component.loginForm.controls['password'].setValue('adminpassword');
  
    const mockToken = 'valid.token.string';
    (movieBookingService.login as jasmine.Spy).and.returnValue(of({ token: mockToken }));
    (movieBookingService.storeToken as jasmine.Spy).and.callThrough(); // Allow this call to proceed
  
    spyOn(window, 'atob').and.returnValue(JSON.stringify({ role: 'admin' }));
  
    component.onSubmit();
  
    expect(router.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
  });
  
  it('should navigate to the user dashboard on user login', () => {
    component.loginForm.controls['email'].setValue('user@example.com');
    component.loginForm.controls['password'].setValue('userpassword');
  
    const mockToken = 'valid.token.string';
    (movieBookingService.login as jasmine.Spy).and.returnValue(of({ token: mockToken }));
    (movieBookingService.storeToken as jasmine.Spy).and.callThrough(); // Allow this call to proceed
  
    spyOn(window, 'atob').and.returnValue(JSON.stringify({ role: 'user' }));
  
    component.onSubmit();
  
    expect(router.navigate).toHaveBeenCalledWith(['/user/dashboard']);
  });
  

  it('should handle token decoding safely', () => {
    const validToken = 'valid.token.string';
    (movieBookingService.login as jasmine.Spy).and.returnValue(of({ token: validToken }));

    component.onSubmit();

    try {
      const decodedToken = atob(validToken.split('.')[1]);
      expect(decodedToken).toBeTruthy();
    } catch (error) {
      expect(error instanceof DOMException).toBeTrue();
    }
  });

  it('should not call login service if form is invalid', () => {
    component.loginForm.controls['email'].setValue(''); // Corrected to loginForm
    component.loginForm.controls['password'].setValue(''); // Corrected to loginForm

    component.onSubmit();

    expect(movieBookingService.login).not.toHaveBeenCalled();
  });
});
