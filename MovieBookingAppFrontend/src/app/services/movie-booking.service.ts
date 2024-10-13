import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieBookingService {
  private apiUrl = 'http://localhost:3000/api/v1.0/moviebooking'; // Backend URL
  private apiUrl1 = 'http://localhost:3000/api/v1.0/moviebooking/admin/movies';

  private emailSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { 
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');
    this.emailSubject.next(email);
    this.roleSubject.next(role);
  }

  // Register User
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgotPassword`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/resetPassword/${token}`, { password });
  }

  getEmail(): Observable<string | null> {
    return this.emailSubject.asObservable();
  }

  // Observable to track role changes
  getUserRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  // Login User
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('email', data.email);  // Store email in session
          sessionStorage.setItem('role', res.data.user.role);  // Store role in session
          this.emailSubject.next(data.email);  // Update BehaviorSubject
          this.roleSubject.next(res.data.user.role);  // Update BehaviorSubject
        }
      })
    );
  }


  // Store token in sessionStorage
  storeToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Get token from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Logout
  logout(): void {
    sessionStorage.clear();
    this.emailSubject.next(null);  // Clear email in BehaviorSubject
    this.roleSubject.next(null);   // Clear role in BehaviorSubject
    this.router.navigate(['/login']);
  }

  // Decode the user role from token
  // getUserRole(): string | null {
  //   const token = this.getToken();
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.role || null;
  //   }
  //   return null;
  // }

  

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAllMovies(): Observable<any> {
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });

    return this.http.get<any>(this.apiUrl1, { headers });
  }



  // Create a new movie
  createMovie(movieData: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });

    return this.http.post<any>(this.apiUrl1, movieData, { headers });
  }

  // Update a movie by ID
  updateMovie(movieId: string, movieData: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });

    return this.http.patch<any>(`${this.apiUrl1}/${movieId}`, movieData, { headers });
  }

  // Delete a movie by ID
  deleteMovie(movieId: string): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });

    return this.http.delete<any>(`${this.apiUrl1}/${movieId}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });
  }

  // Get all movies
  getAllMoviesU(): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get(`${this.apiUrl}/movies/all`, { headers });
  }

  // Search for a movie by its name
  searchMovieByName(movieName: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/movies/search/${movieName}`, { headers });
  }

  // Book a ticket for a movie
  bookTicket(movieName: string, ticketData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/movies/book/${movieName}`, ticketData, { headers });
  }

  // Update the ticket status
  updateTicketStatus(movieName: string, ticketId: string, status: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiUrl}/movies/${movieName}/update/${ticketId}`, { status }, { headers });
  }

  // Cancel a ticket
  // Cancel a ticket
  cancelTicket(movieName: string, seatNumber: string): Observable<any> {
    const headers = this.getHeaders(); // Ensure token is included in headers
    return this.http.patch(`${this.apiUrl}/movies/cancel/${movieName}/${seatNumber}`, {}, { headers });
  }

}





// export class MovieBookingService {
//   private apiUrl = 'http://localhost:3000/api/v1.0/moviebooking'; // Backend URL

//   constructor(private http: HttpClient, private router: Router) {}

//   // Register User
//   register(data: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }

//   forgotPassword(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/forgotPassword`, {email});
//   }

//   resetPassword(token: string, password: string): Observable<any> {
//     return this.http.patch(`${this.apiUrl}/resetPassword/${token}`, { password });
//   }

//   // Login User
//   login(data: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, data);
//   }

//   // Store token in localStorage
//   storeToken(token: string): void {
//     localStorage.setItem('token', token);
//   }

//   // Get token from localStorage
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   // Logout
//   logout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

//   // Decode the user role (you can use JWT-decode library for detailed role extraction)
//   getUserRole(): string | null {
//     const token = this.getToken();
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.role;
//     }
//     return null;
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }


//   // getAllMovies(): Observable<Object>{
//   //   let firstName=sessionStorage.getItem('firstName');
//   //   let password=sessionStorage.getItem('password');
//   //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });

//   //   return this.http.get(`${this._url}/all`,{headers});
//   // }

//   // bookTickets(ticket: any): Observable<Object>{
//   //   let firstName=sessionStorage.getItem('firstName');
//   //   let password=sessionStorage.getItem('password');
//   //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
//   //   return this.http.post(`${this._url}/bookTickets`, ticket,{headers,responseType:"text"});
//   // }

//   // addMovie(movie: any): Observable<Object>{
//   //   let firstName=sessionStorage.getItem('firstName');
//   //   let password=sessionStorage.getItem('password');
//   //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
//   //   return this.http.post(`${this._url}/movie/add`, movie, {headers,responseType:'text'});
//   // }

//   // searchMovie(query:any): Observable<Object>{
//   //   let firstName=sessionStorage.getItem('firstName');
//   //   let password=sessionStorage.getItem('password');
//   //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
//   //   return this.http.get(`${this.apiUrl}/movies/search/${query}`,{headers});
//   // }

//   // deleteMovie(movieName:any, theatherName:any){
//   //   let firstName=sessionStorage.getItem('firstName');
//   //   let password=sessionStorage.getItem('password');
//   //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(firstName + ':' + password) });
//   //   if(firstName=='Admin'){
//   //       Swal.fire({
//   //           position: "top-end",
//   //           icon: "success",
//   //           title: movieName +"  Movie Deleted successfully",
//   //           showConfirmButton: false,
//   //           timer: 1500
//   //         });
//   //     }
//   //     else{
//   //       Swal.fire("ADMIN ACCESS REQUIRED");
//   //     }
//   //   return this.http.delete(`${this.apiUrl}/${movieName}/delete/${theatherName}`, {headers,responseType:'text'});
//   // }
// }
