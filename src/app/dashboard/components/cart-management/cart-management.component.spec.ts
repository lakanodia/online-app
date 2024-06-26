import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartManagementComponent } from './cart-management.component';

describe('CartManagementComponent', () => {
  let component: CartManagementComponent;
  let fixture: ComponentFixture<CartManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
