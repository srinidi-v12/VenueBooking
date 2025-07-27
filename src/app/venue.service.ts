import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  private apiUrl = 'http://localhost:6001/venues';  // Update with your backend URL

  constructor(private http: HttpClient) { }

  getVenues(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addVenue(venue: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/venues`, venue);
  }

  deleteVenue(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateVenue(id: string, venue: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, venue);
  }
}
