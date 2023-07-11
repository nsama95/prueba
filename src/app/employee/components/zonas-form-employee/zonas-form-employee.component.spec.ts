import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasFormEmployeeComponent } from './zonas-form-employee.component';

describe('ZonasFormEmployeeComponent', () => {
  let component: ZonasFormEmployeeComponent;
  let fixture: ComponentFixture<ZonasFormEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonasFormEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasFormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
