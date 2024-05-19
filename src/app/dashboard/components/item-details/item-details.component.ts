import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailsService } from '../../services/item-details.service';
import { ReviewDialogComponent } from '../../modals/review-dialog/review-dialog.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent  implements OnInit {
  item: any;
  activeTab: string = 'details';
  @ViewChild(ReviewDialogComponent) reviewDialog!: ReviewDialogComponent;

   constructor(private route: ActivatedRoute, private itemDetailService: ItemDetailsService, private router: Router,){

   }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.getItemDetails(itemId);
    });
  }

  getItemDetails(itemId: string): void {
    this.itemDetailService.getItemById(itemId).subscribe((item: any) => {
      this.item = item;
    });
  }

  openReviewDialog(): void { // Ensure this method exists
    this.reviewDialog.open();
  }
  addToCart(){

  }

  handleReview(review: any): void {
    // Handle the review submission
    console.log(review);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); // Navigate back to the products catalog
  }
}
