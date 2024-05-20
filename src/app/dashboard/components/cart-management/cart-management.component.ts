import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-cart-management',
  templateUrl: './cart-management.component.html',
  styleUrl: './cart-management.component.scss'
})
export class CartManagementComponent implements OnInit{
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.loadCartItems();
  }



  signOut(): void {
    // Remove token from localStorage
    this.authService.removeToken();
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: string): Observable<void> {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    return of(); // Return an observable to mimic the asynchronous behavior
  }

  updateItemQuantity2(item: CartItem, quantity: number): void {
    item.quantity = quantity;
    this.cartService.updateCartItem(item).subscribe(() => {
      this.loadCartItems();
    });
  }

  updateItemQuantity(item: CartItem, quantity: number): void {
    item.quantity = quantity;
    // Manually calculate the total price
    const totalPrice = item.price * item.quantity;
    // Update the item's total price
    item.totalPrice = totalPrice;
    // Update the cart item in the service
    this.cartService.updateCartItem(item).subscribe(() => {
      this.loadCartItems();
    });
  }

  clearCart(): Observable<void> {
    this.cartItems = [];
    return of(); // Return an observable to mimic the asynchronous behavior
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); // Navigate back to the products catalog
  }
}
