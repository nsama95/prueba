import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZonasComponent } from './admin-zonas.component';

describe('AdminZonasComponent', () => {
  let component: AdminZonasComponent;
  let fixture: ComponentFixture<AdminZonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminZonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
