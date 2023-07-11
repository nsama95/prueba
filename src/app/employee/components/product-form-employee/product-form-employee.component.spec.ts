import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormEmployeeComponent } from './product-form-employee.component';

describe('ProductFormEmployeeComponent', () => {
  let component: ProductFormEmployeeComponent;
  let fixture: ComponentFixture<ProductFormEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
