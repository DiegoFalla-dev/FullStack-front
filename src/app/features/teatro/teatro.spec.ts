import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teatro } from './teatro';

describe('Teatro', () => {
  let component: Teatro;
  let fixture: ComponentFixture<Teatro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teatro],
    }).compileComponents();

    fixture = TestBed.createComponent(Teatro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
