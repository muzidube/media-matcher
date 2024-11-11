import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set gold colors for ratings >= 95', () => {
    component.rating = 95;
    component.ngOnInit();
    expect(component.ratingColor).toBe('#FFD700');
    expect(component.ratingBgColor).toBe('#7d6c0e');
  });

  it('should set green colors for ratings >= 70', () => {
    component.rating = 70;
    component.ngOnInit();
    expect(component.ratingColor).toBe('#21d07a');
    expect(component.ratingBgColor).toBe('#204529');
  });

  it('should set yellow colors for ratings >= 50', () => {
    component.rating = 50;
    component.ngOnInit();
    expect(component.ratingColor).toBe('#d2d531');
    expect(component.ratingBgColor).toBe('#423d0f');
  });

  it('should set red colors for ratings >= 10', () => {
    component.rating = 10;
    component.ngOnInit();
    expect(component.ratingColor).toBe('#db2360');
    expect(component.ratingBgColor).toBe('#571435');
  });

  it('should calculate correct rating offset', () => {
    component.rating = 75;
    component.ngOnInit();
    expect(component.ratingOffset).toBe(30); // 120 - (120 * 75 / 100)
  });
});
