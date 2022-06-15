import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeDangerComponent } from './mensaje-danger.component';

describe('MensajeDangerComponent', () => {
  let component: MensajeDangerComponent;
  let fixture: ComponentFixture<MensajeDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
