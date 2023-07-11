import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeZonasComponent } from './employee-zonas.component';

describe('AdminZonasComponent', () => {
  let component: EmployeeZonasComponent;
  let fixture: ComponentFixture<EmployeeZonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeZonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
