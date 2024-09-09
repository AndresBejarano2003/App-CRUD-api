import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesEmpresaComponent } from './informesEmpresa.component';

describe('InformesEmpresaComponent', () => {
  let component: InformesEmpresaComponent;
  let fixture: ComponentFixture<InformesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
