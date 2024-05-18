import { Component } from '@angular/core';
import { ICategory, IProduct } from '../../../models/product.interface';
import { ProductsService } from '../../../services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent {
  originalProducts: IProduct[] = [];
  products: IProduct[] = [];
  pageIndex = 1;
  pageSize = 10;
  loading = false; 
  searchQuery: string = '';

  categoryNames: string[] = [];
  brands: string[] = [];

  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedPriceRange: string = '';
  selectedRating: number = 0;
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.loadProducts(); 
  }

  search(): void {
    if (!this.searchQuery.trim()) {
      this.loadProducts();
      return;
    }

    this.products = this.originalProducts.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
    
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.pageIndex, this.pageSize)
      .pipe(
        map((response: any) => response.products)
      )
      .subscribe(products => {
        this.originalProducts = products;
        this.products = [...this.originalProducts];
        this.loading = false;
        console.log(this.products); // Ensure that products are correctly assigned
      });
  }

  addToCart(productId: string, quantity: number): void {
    this.productService.addToCart(productId, quantity).subscribe(() => {
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
    this.pageIndex = 1;
    this.loadProducts();
  }
  
  loadBrands(): void {
    this.productService.getBrands()
      .subscribe((brands: string[]) => {
        this.brands = brands;
      });
  }


  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedPriceRange = '';
    this.selectedRating = 0;
    this.products = [...this.originalProducts];
  }

  applyFilters(): void {
    this.products = this.originalProducts.filter(product => {
      if (this.selectedCategory) {
        return product.category.name === this.selectedCategory;
      }else if(this.selectedBrand){
        return product.brand === this.selectedBrand;
      }else{
        return true;
      }
    });
  }
  
  

  loadCategories(): void {
    this.productService.getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categoryNames = categories.map(category => category.name);
      });
  }


}

