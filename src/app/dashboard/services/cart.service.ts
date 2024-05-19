import { Injectable } from '@angular/core';
import { CartItem } from '../models/product.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [

  ];
  constructor() { }


  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  addToCart(item: CartItem): Observable<void> {
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    return of();
  }


  removeFromCart(productId: string): Observable<void> {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    return of();
  }

  updateCartItem(item: CartItem): Observable<void> {
    const index = this.cartItems.findIndex(cartItem => cartItem.productId === item.productId);
    if (index !== -1) {
      this.cartItems[index] = item;
    }
    return of();
  }

  clearCart(): Observable<void> {
    this.cartItems = [];
    return of();
  }
}
