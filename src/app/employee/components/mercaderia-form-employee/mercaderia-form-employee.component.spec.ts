import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercaderiaFormEmployeeComponent } from './mercaderia-form-employee.component';

describe('MercaderiaFormComponent', () => {
  let component: MercaderiaFormEmployeeComponent;
  let fixture: ComponentFixture<MercaderiaFormEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercaderiaFormEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercaderiaFormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
