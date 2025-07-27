import { Component } from '@angular/core';

interface Venue {
  _id?: string; // Optional _id for MongoDB
  name: string;
  description: string;
  imageUrl: string;
}
@Component({
  selector: 'app-venue',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenueComponent {

  // venues is an array of Venue objects
  venues: Venue[] = [];

  // newVenue is an object that follows the Venue structure
  newVenue: Venue = {
    name: '',
    description: '',
    imageUrl: ''
  };

  // Method to add venue
  addVenue() {
    console.log('New Venue Added:', this.newVenue);
    // Here you would send this newVenue to your backend or save it locally
    this.venues.push(this.newVenue); // For now, we're just pushing it to the array
    this.newVenue = { name: '', description: '', imageUrl: '' }; // Reset the form after adding
  }

  

  // Optionally, add methods to delete or update venues
  deleteVenue(venueId: string) {
    this.venues = this.venues.filter(venue => venue._id !== venueId);
  }

  updateVenue(venueId: string) {
    // Implement update logic here
  }

  checkAvailability(date: string, timeSlot: string) {
    // Implement availability checking logic here
  }
}
