import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api/venues';

  login(username: string, password: string): boolean {
    return username === 'admin' && password === 'admin123';
  }

  constructor(private http: HttpClient) {}

  checkVenueAvailability(date: string, timeSlot: string): Observable<any> {
    // Adjust the endpoint URL and query format as per your backend
    return this.http.get<any>(`${this.apiUrl}/check-availability?date=${date}&timeSlot=${timeSlot}`);
  }
}
