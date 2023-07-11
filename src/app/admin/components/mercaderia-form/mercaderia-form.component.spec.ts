import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercaderiaFormComponent } from './mercaderia-form.component';

describe('MercaderiaFormComponent', () => {
  let component: MercaderiaFormComponent;
  let fixture: ComponentFixture<MercaderiaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercaderiaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercaderiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
