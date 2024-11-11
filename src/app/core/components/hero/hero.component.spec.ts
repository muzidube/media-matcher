import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { ResultsService } from '@services/results.service';
import { GenreButtonComponent } from '@modules/home/components/genre-button/genre-button.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let mockResultsService: jasmine.SpyObj<ResultsService>;

  beforeEach(async () => {
    mockResultsService = jasmine.createSpyObj('ResultsService', [
      'updateResults',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeroComponent, GenreButtonComponent],
      providers: [{ provide: ResultsService, useValue: mockResultsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with genres', () => {
    expect(component.genres.length).toBeGreaterThan(0);
  });

  it('should track selected genre state', () => {
    const genre = 'Action';
    component.selectedGenre = genre;
    expect(component.isGenreSelected(genre)).toBeTrue();
    expect(component.isGenreSelected('Comedy')).toBeFalse();
  });
});
