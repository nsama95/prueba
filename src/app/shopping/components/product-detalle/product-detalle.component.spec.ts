import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetalleComponent } from './product-detalle.component';

describe('ProductDetalleComponent', () => {
  let component: ProductDetalleComponent;
  let fixture: ComponentFixture<ProductDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
