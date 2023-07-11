import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMercaderiaComponent } from './admin-mercaderia.component';

describe('AdminMercaderiaComponent', () => {
  let component: AdminMercaderiaComponent;
  let fixture: ComponentFixture<AdminMercaderiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMercaderiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMercaderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
