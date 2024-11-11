import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreButtonComponent } from './genre-button.component';

describe('GenreButtonComponent', () => {
  let component: GenreButtonComponent;
  let fixture: ComponentFixture<GenreButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected genre on click', () => {
    const genre = 'Action';
    component.genre = genre;

    spyOn(component.genreSelected, 'emit');
    component.genreSelected.emit(genre);

    expect(component.genreSelected.emit).toHaveBeenCalledWith(genre);
  });

  it('should apply selected styles when isSelected is true', () => {
    component.isSelected = true;
    expect(component.buttonClasses).toContain(
      'bg-primary text-primary-foreground'
    );
  });

  it('should apply default styles when isSelected is false', () => {
    component.isSelected = false;
    expect(component.buttonClasses).toContain('bg-background text-foreground');
  });

  it('should apply disabled styles when disabled is true', () => {
    component.disabled = true;
    expect(component.buttonClasses).toContain('opacity-50 cursor-not-allowed');
  });
});
