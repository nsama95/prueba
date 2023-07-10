import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReposicionComponent } from './admin-reposicion.component';

describe('AdminReposicionComponent', () => {
  let component: AdminReposicionComponent;
  let fixture: ComponentFixture<AdminReposicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReposicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
