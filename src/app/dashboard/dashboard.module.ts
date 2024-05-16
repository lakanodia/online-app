import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog/product-catalog.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProductCatalogComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule
  ],
  exports: [DashboardComponent] 
})
export class DashboardModule { }
