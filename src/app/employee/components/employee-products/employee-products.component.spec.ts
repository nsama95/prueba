import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProductsComponent } from './employee-products.component';

describe('EmployeeProductsComponent', () => {
  let component: EmployeeProductsComponent;
  let fixture: ComponentFixture<EmployeeProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
