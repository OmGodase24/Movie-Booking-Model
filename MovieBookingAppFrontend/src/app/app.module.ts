import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatGridListModule} from '@angular/material/grid-list';
// import { LoginComponent } from './components/login/login.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
// import { RegisterComponent } from './components/register/register.component';
// import { ShowAllMoviesComponent } from './components/show-all-movies/show-all-movies.component';
// import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';
//  import { AddMovieComponent } from './components/add-movie/add-movie.component';
// import { ShowAllMoviesComponent } from './components/show-all-movies/show-all-movies.component';
import { LoginComponent } from './components/login/login.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { MatButtonModule } from '@angular/material/button';
// import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
//import { MatFormField } from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // NavbarComponent,
    // ForgetPasswordComponent,
    // RegisterComponent,
    // ShowAllMoviesComponent,
    // BookTicketsComponent,
    // AddMovieComponent,
    // ShowAllMoviesComponent,
    LoginComponent,
    // BookTicketsComponent,
    RegisterComponent,
    NavbarComponent,
    // SearchMovieComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    //SearchMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  //  BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
   // MatFormField
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }