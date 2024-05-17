import { Component } from '@angular/core';
import { IProduct } from '../../../models/product.interface';
import { ProductsService } from '../../../services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent {
  products: IProduct[] = [];
  pageIndex = 1;
  pageSize = 10;
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts(); 
  }

  // loadProducts(): void {
  //   this.productService.getProducts(this.pageIndex, this.pageSize)
  //   .subscribe(products => this.products = products);

  //   console.log(this.products);
      
  // }

  loadProducts(): void {
    this.productService.getProducts(this.pageIndex, this.pageSize)
      .pipe(
        map((response: any) => response.products)
      )
      .subscribe(products => {
        this.products = products;
        console.log(this.products); // Ensure that products are correctly assigned
      });
  }

  onPageChange(newPageIndex: number): void {
    if (newPageIndex < 1) {
      return;
    }
    this.pageIndex = newPageIndex;
    this.loadProducts();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageIndex = 1; // Reset page index when changing page size
    this.loadProducts();
  }

}

