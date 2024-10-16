import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesAuditorComponent } from './informesAuditor.component';

describe('InformesAuditorComponent', () => {
  let component: InformesAuditorComponent;
  let fixture: ComponentFixture<InformesAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesAuditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
