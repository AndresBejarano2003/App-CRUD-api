import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaEmpresaComponent } from './micuentaEmpresa.component';

describe('MiCuentaEmpresaComponent', () => {
  let component: MiCuentaEmpresaComponent;
  let fixture: ComponentFixture<MiCuentaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiCuentaEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuentaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
