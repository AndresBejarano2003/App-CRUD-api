import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpresaAuditorComponent } from './dashboardEmpresa.component';

describe('DashboardEmpresaAuditorComponent', () => {
  let component: DashboardEmpresaAuditorComponent;
  let fixture: ComponentFixture<DashboardEmpresaAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmpresaAuditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmpresaAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
