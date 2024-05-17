import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://api.everrest.educata.dev/shop/products/all';

  constructor(private http: HttpClient) { }

  getProducts(pageIndex: number, pageSize: number): Observable<IProduct[]> {
    const url = `${this.apiUrl}?page_index=${pageIndex}&page_size=${pageSize}`;
    return this.http.get<IProduct[]>(url);
  }
}
