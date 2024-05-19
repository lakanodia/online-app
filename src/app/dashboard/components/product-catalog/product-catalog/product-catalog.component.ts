import { Component } from '@angular/core';
import { ICategory, IProduct } from '../../../models/product.interface';
import { ProductsService } from '../../../services/products.service';
import { map } from 'rxjs';
import { CartService } from '../../../services/cart.service';

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

  minPrice!: number;
  maxPrice!: number; 

  categoryNames: string[] = [];
  brands: string[] = [];


  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedPriceRange: string = '';
  selectedRating: number | null = null; 
  constructor(private productService: ProductsService, private cartService: CartService) {}

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

  addToCart2(productId: string, quantity: number): void {
    this.productService.addToCart(productId, quantity).subscribe(() => {
    });
  }


  addToCart(item: IProduct): void {
    const cartItem = {
      productId: item._id,
      title: item.title,
      price: item.price.current,
      quantity: 1, // Default quantity is 1
      thumbnail: item.thumbnail,
      totalPrice: item.price.current
    };
    this.cartService.addToCart(cartItem).subscribe(() => {
      // Handle success (e.g., show a notificat on)
    }, error => {
      console.error('Error adding item to cart:', error);
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
    this.selectedRating = null;
    this.products = [...this.originalProducts];
  }


  applyFilters(): void {
    let filteredProducts = [...this.originalProducts];
  
    // Apply category filter
    if (this.selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category.name === this.selectedCategory);
    }

    // Apply rating filter if not null
    if (this.selectedRating !== null) {
      console.log(this.selectedRating);
      
      filteredProducts = filteredProducts.filter(product => product.rating === this.selectedRating);
    }
  
    // Apply brand filter
    if (this.selectedBrand) {
      filteredProducts = filteredProducts.filter(product => product.brand === this.selectedBrand);
    }
  
    // Apply min/max price filter
    if (this.minPrice && this.maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price.current >= this.minPrice && product.price.current <= this.maxPrice
      );
    }
    
    // Apply search query filter
    if (this.searchQuery) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
    this.products = filteredProducts;
  }
    
  

  loadCategories(): void {
    this.productService.getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categoryNames = categories.map(category => category.name);
      });
  }


}

