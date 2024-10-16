import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaAuditorComponent } from './micuentaAuditor.component';

describe('MiCuentaAuditorComponent', () => {
  let component: MiCuentaAuditorComponent;
  let fixture: ComponentFixture<MiCuentaAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiCuentaAuditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuentaAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
