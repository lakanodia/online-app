import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit{
  images: string[] = [
    'https://purepng.com/public/uploads/large/purepng.com-laptopelectronicslaptopcomputer-941524676166s0nuj.png',
    'https://media.extra.com/s/aurora/100345804_800/Apple-iPhone-15-Pro-Max%2C-5G%2C-6-7-inch%2C-256GB%2C-Blue-Titanium?locale=en-GB,en-*,*',
    'https://i.pinimg.com/originals/cc/8b/70/cc8b70ed6b81820f019dc1359dd8875d.png'
  ];
  currentIndex = 0;

  ngOnInit(): void {
    this.startSlider();
  }

  startSlider(): void {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
