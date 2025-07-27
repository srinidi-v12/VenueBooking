import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    fullname: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    dob: '',
    state: '',
    aesthetic: {
      chic: false,
      modern: false,
      trad: false,
      trend: false
    }
  };

  selectedFile: File | null = null;
  registrationError: string | null = null; // To hold error messages

  constructor(private authService: AuthService, private router: Router) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  validateForm(): boolean {
    // Basic validation to check if required fields are filled
    if (!this.user.fullname || !this.user.email || !this.user.username || !this.user.password) {
      this.registrationError = 'Please fill in all required fields.';
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return; // Stop submission if validation fails
    }

    const formData = new FormData();
    formData.append('fullname', this.user.fullname);
    formData.append('email', this.user.email);
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('gender', this.user.gender);
    formData.append('dob', this.user.dob);
    formData.append('state', this.user.state);
    formData.append('aesthetic.chic', String(this.user.aesthetic.chic));
    formData.append('aesthetic.modern', String(this.user.aesthetic.modern));
    formData.append('aesthetic.trad', String(this.user.aesthetic.trad));
    formData.append('aesthetic.trend', String(this.user.aesthetic.trend));

    if (this.selectedFile) {
      formData.append('profile', this.selectedFile);
    }

    this.authService.register(formData).subscribe(
      res => {
        alert('Registered successfully!');
        this.router.navigate(['/login']);
      },
      err => {
        this.registrationError = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    );
  }
}

