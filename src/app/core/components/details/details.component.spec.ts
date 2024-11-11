import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { ResultsService } from '@services/results.service';
import { BehaviorSubject } from 'rxjs';
import { RatingComponent } from '@shared/ui/rating/rating.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockResultsService: jasmine.SpyObj<ResultsService>;
  let selectedMediaSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    selectedMediaSubject = new BehaviorSubject<any>(null);
    mockResultsService = jasmine.createSpyObj('ResultsService', [], {
      selectedMedia$: selectedMediaSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [DetailsComponent, RatingComponent],
      providers: [{ provide: ResultsService, useValue: mockResultsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle movie details', () => {
    const mockMovie = {
      type: 'movie',
      details: {
        original_title: 'Test Movie',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        release_date: '2024-03-20',
        overview: 'Test overview',
        vote_average: 8.5,
        status: 'Released',
        tagline: 'Test tagline',
      },
    };

    selectedMediaSubject.next(mockMovie);
    fixture.detectChanges();

    expect(component.mediaType).toBe('movie');
    expect(component.displayDetails?.title).toBe('Test Movie');
    expect(component.moreInfoUrl).toContain(
      'justwatch.com/uk/movie/test-movie'
    );
  });

  it('should handle TV show details', () => {
    const mockTV = {
      type: 'tv',
      details: {
        name: 'Test Show',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        first_air_date: '2024-03-20',
        overview: 'Test overview',
        vote_average: 8.5,
        status: 'Running',
        tagline: 'Test tagline',
      },
    };

    selectedMediaSubject.next(mockTV);
    fixture.detectChanges();

    expect(component.mediaType).toBe('tv');
    expect(component.displayDetails?.title).toBe('Test Show');
    expect(component.moreInfoUrl).toContain(
      'justwatch.com/uk/tv-series/test-show'
    );
  });

  it('should handle game details', () => {
    const mockGame = {
      type: 'game',
      details: {
        name: 'Test Game',
        cover: { image_id: 'cover123' },
        artworks: [{ image_id: 'art123' }],
        release_dates: [{ date: 1710892800 }], // 2024-03-20
        summary: 'Test summary',
        rating: 85,
      },
    };

    selectedMediaSubject.next(mockGame);
    fixture.detectChanges();

    expect(component.mediaType).toBe('game');
    expect(component.displayDetails?.title).toBe('Test Game');
    expect(component.moreInfoUrl).toContain(
      'isthereanydeal.com/game/test-game/info'
    );
  });

  it('should handle missing game artwork gracefully', () => {
    const mockGame = {
      type: 'game',
      details: {
        name: 'Test Game',
        cover: { image_id: 'cover123' },
        release_dates: [],
        summary: 'Test summary',
        rating: 85,
      },
    };

    selectedMediaSubject.next(mockGame);
    fixture.detectChanges();

    expect(component.displayDetails?.backgroundPath).toContain('cover123');
    expect(component.displayDetails?.releaseDate).toBe('N/A');
  });

  it('should clean up subscription on destroy', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
