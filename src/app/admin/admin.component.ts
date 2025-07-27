import { Component, OnInit } from '@angular/core';
import { VenueService } from '../venue.service'; // Import the service
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface Venue {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-admin',
  standalone : false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    // venues is an array of Venue objects
    venues: Venue[] = [];

    // newVenue is an object that follows the Venue structure
    newVenue: Venue = {
      name: '',
      description: '',
      imageUrl: ''
    };
  message = '';

  constructor(private venueService: VenueService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchVenues();
  }

  fetchVenues(): void {
    this.venueService.getVenues().subscribe(
      (data) => {
        this.venues = data;
      },
      (error) => {
        console.error('Error fetching venues:', error);
      }
    );
  }

  addVenue(): void {
    this.venueService.addVenue(this.newVenue).subscribe(
      (response) => {
        this.message = 'Venue added successfully!';
        this.fetchVenues(); // Refresh the venue list from server
        this.newVenue = { name: '', description: '', imageUrl: '' }; // Reset form
      },
      (error) => {
        console.error('Error adding venue:', error);
        this.message = 'Failed to add venue!';
      }
    );
  }
  

  deleteVenue(id: string): void {
    this.venueService.deleteVenue(id).subscribe(
      (response) => {
        this.message = 'Venue deleted successfully!';
        this.fetchVenues(); // Refresh the venue list
      },
      (error) => {
        console.error('Error deleting venue:', error);
        this.message = 'Failed to delete venue!';
      }
    );
  }

  updateVenue(id: string): void {
    const updatedVenue = { ...this.newVenue }; // Use the form data for updating
    this.venueService.updateVenue(id, updatedVenue).subscribe(
      (response) => {
        this.message = 'Venue updated successfully!';
        this.fetchVenues(); // Refresh the venue list
      },
      (error) => {
        console.error('Error updating venue:', error);
        this.message = 'Failed to update venue!';
      }
    );
  }
  checkAvailability(date: string, timeSlot: string): void {
    this.adminService.checkVenueAvailability(date, timeSlot).subscribe(
      (response) => {
        if (response.isBooked) {
          this.message = `This venue is already booked on ${date} at ${timeSlot}. Please choose another venue.`;
        } else {
          this.message = 'The venue is available for booking.';
        }
      },
      (error) => {
        console.error('Error checking availability:', error);
      }
    );
  }
}
