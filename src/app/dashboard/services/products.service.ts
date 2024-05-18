import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://api.everrest.educata.dev/shop/products/all';
  private cartUrl = 'https://api.everrest.educata.dev/shop/cart/product';

  private categoryUrl = 'https://api.everrest.educata.dev/shop/products/categories';
  private apiUrlBrands = 'https://api.everrest.educata.dev/shop/products/brands';

  constructor(private http: HttpClient) { }

  getProducts(pageIndex: number, pageSize: number): Observable<IProduct[]> {
    const url = `${this.apiUrl}?page_index=${pageIndex}&page_size=${pageSize}`;
    return this.http.get<IProduct[]>(url);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const body = { id: productId, quantity: quantity };
    return this.http.post<any>(this.cartUrl, body);
  }


  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoryUrl);
  }

  getBrands(): Observable<string[]> { // Specify the return type as IBrand[]
    return this.http.get<string[]>(this.apiUrlBrands);
  }

}
