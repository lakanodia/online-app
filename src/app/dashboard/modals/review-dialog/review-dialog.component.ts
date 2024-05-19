import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialogComponent {
  isOpen = false;
  review = { rating: 0, firstName: '', lastName: '' };

  @Output() reviewSubmitted = new EventEmitter<any>();
  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  submitReview(): void {
    this.reviewSubmitted.emit(this.review);
    this.close();
  }
}
