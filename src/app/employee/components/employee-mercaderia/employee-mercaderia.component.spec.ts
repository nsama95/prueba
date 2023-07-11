import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMercaderiaComponent } from './employee-mercaderia.component';

describe('EmployeeMercaderiaComponent', () => {
  let component: EmployeeMercaderiaComponent;
  let fixture: ComponentFixture<EmployeeMercaderiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMercaderiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMercaderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
