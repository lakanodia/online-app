import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailsService } from '../../services/item-details.service';
import { ReviewDialogComponent } from '../../modals/review-dialog/review-dialog.component';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models/product.interface';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent  implements OnInit {
  item: any;
  activeTab: string = 'details';
  @ViewChild(ReviewDialogComponent) reviewDialog!: ReviewDialogComponent;

   constructor(private route: ActivatedRoute, 
    private itemDetailService: ItemDetailsService, 
    private router: Router,
    private cartService: CartService ,
    private authService: AuthService){

   }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.getItemDetails(itemId);
    });
  }

  signOut(): void {
    // Remove token from localStorage
    this.authService.removeToken();
    // Redirect to login page
    this.router.navigate(['/login']);
  }


  getItemDetails(itemId: string): void {
    this.itemDetailService.getItemById(itemId).subscribe((item: any) => {
      this.item = item;
    });
  }

  openReviewDialog(): void { // Ensure this method exists
    this.reviewDialog.open();
  }


  addToCart(item: IProduct): void {
    const cartItem = {
      productId: item._id,
      title: item.title,
      price: item.price.current,
      quantity: 1, // Default quantity is 1
      thumbnail: item.thumbnail,
      totalPrice: 1
    };
    this.cartService.addToCart(cartItem).subscribe(() => {
      // Handle success (e.g., show a notificat on)
    }, error => {
      console.error('Error adding item to cart:', error);
    });
  }

  handleReview(review: any): void {
    // Handle the review submission
    console.log(review);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); // Navigate back to the products catalog
  }
}
