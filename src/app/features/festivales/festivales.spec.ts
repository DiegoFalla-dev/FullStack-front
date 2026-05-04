import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Festivales } from './festivales';

describe('Festivales', () => {
  let component: Festivales;
  let fixture: ComponentFixture<Festivales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Festivales],
    }).compileComponents();

    fixture = TestBed.createComponent(Festivales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
