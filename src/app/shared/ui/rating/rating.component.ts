import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() details = false;
  ratingColor: string = '';
  ratingBgColor: string = '';
  ratingOffset: number = 0;

  ngOnInit() {
    this.calculateRatingStyles();
  }

  private calculateRatingStyles(): void {
    // Set foreground color
    if (this.rating >= 95) this.ratingColor = '#FFD700';
    else if (this.rating >= 70) this.ratingColor = '#21d07a';
    else if (this.rating >= 50) this.ratingColor = '#d2d531';
    else if (this.rating >= 10) this.ratingColor = '#db2360';
    else this.ratingColor = '#666666';

    // Set background color
    if (this.rating >= 95) this.ratingBgColor = '#7d6c0e';
    else if (this.rating >= 70) this.ratingBgColor = '#204529';
    else if (this.rating >= 50) this.ratingBgColor = '#423d0f';
    else if (this.rating >= 10) this.ratingBgColor = '#571435';
    else this.ratingBgColor = '#666666';

    // Calculate offset
    this.ratingOffset = 120 - (120 * this.rating) / 100;
  }
}
