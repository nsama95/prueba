import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReposicionComponent } from './employee-reposicion.component';

describe('EmployeeReposicionComponent', () => {
  let component: EmployeeReposicionComponent;
  let fixture: ComponentFixture<EmployeeReposicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeReposicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeReposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
