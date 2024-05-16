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

  getProducts(pageIndex: number = 1, pageSize: number = 10): Observable<IProduct[]> {
    // Create an instance of HttpParams to handle URL parameters
    let params = new HttpParams();
    params = params.set('page_index', pageIndex.toString());
    params = params.set('page_size', pageSize.toString());

    // Make the GET request with the URL parameters
    return this.http.get<IProduct[]>(this.apiUrl, { params });
  }
}
