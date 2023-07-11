import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCategoriesComponent } from './employee-categories.component';

describe('EmployeeCategoriesComponent', () => {
  let component: EmployeeCategoriesComponent;
  let fixture: ComponentFixture<EmployeeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
