import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog/product-catalog.component';
import { FormsModule } from '@angular/forms';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CartManagementComponent } from './components/cart-management/cart-management.component';
import { ReviewDialogComponent } from './modals/review-dialog/review-dialog.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProductCatalogComponent,
    ItemDetailsComponent,
    CartManagementComponent,
    ReviewDialogComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [DashboardComponent] 
})
export class DashboardModule { }
