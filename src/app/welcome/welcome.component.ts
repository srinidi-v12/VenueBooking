import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  images: string[] = [
    '/img/ss1.png', '/img/aa1.png',
    '/img/gp1.png', '/img/gp2.png', '/img/gp3.png',
    '/img/gp4.png', '/img/gp5.png', '/img/gp6.png',
    '/img/gp7.png', '/img/gp8.png', '/img/gp9.png',
    '/img/gp10.png', '/img/gp11.png', '/img/gp12.png',
    '/img/gp13.png', '/img/gp14.png'
  ];

  currentImage: string = this.images[0];
  currentIndex: number = 0;

  ngOnInit():void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
      console.log('Current Image:', this.currentImage);
    }, 2000);
  }
}
