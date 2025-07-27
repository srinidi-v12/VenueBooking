import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service'; // Import AdminService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
    isAdmin: false // Add a field to check if the user is an admin
  };

  constructor(
    private authService: AuthService,
    private adminService: AdminService, // Inject AdminService
    private router: Router
  ) {}

  onSubmit() {
    if (this.credentials.isAdmin) {
      // Handle admin login
      const isAdminAuthenticated = this.adminService.login(this.credentials.username, this.credentials.password);
      if (isAdminAuthenticated) {
        alert('Admin login successful!');
        this.router.navigate(['/admin']); // Navigate to admin dashboard
      } else {
        alert('Admin login failed. Please try again.');
      }
    } else {
      // Handle regular user login
      this.authService.login(this.credentials).subscribe(
        res => {
          console.log('Response:', res); // Log the response for debugging
          if (res.userId) {
            localStorage.setItem('userId', res.userId); // Store userId in local storage
            localStorage.setItem('username', res.username);
            alert('Login successful!');
            this.router.navigate(['/home']); // Navigate to user home
          } else {
            alert('Login failed. Please try again.');
          }
        },
        err => {
          // Log error for debugging
          console.error('Error:', err);
          if (err.error && err.error.message) {
            alert(err.error.message); // Show specific error message from backend
          } else {
            alert('Invalid credentials'); // Fallback error message
          }
        }
      );
    }
  }
}
