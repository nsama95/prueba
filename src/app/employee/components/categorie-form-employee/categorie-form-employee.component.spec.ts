import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieFormEmployeeComponent } from './categorie-form-employee.component';

describe('CategorieFormEmployeeComponent', () => {
  let component: CategorieFormEmployeeComponent;
  let fixture: ComponentFixture<CategorieFormEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieFormEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieFormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
