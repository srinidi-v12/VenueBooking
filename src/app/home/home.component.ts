import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  navigateToBooking() {
    this.router.navigate(['/bookvenue']);
  }
  navigateToAvailableVenues() {
    this.router.navigate(['/venues']);
  }

  navigateToMyBookings() {
    this.router.navigate(['/mybookings']);
  }

  logout() {
    // Implement logout logic here (e.g., clear tokens, redirect to welcome page)
    this.router.navigate(['/welcome']);
  }
}