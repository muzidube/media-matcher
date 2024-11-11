import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaComponent } from './media.component';
import { ResultsService } from '@services/results.service';
import { RatingComponent } from '@shared/ui/rating/rating.component';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;
  let mockResultsService: jasmine.SpyObj<ResultsService>;

  beforeEach(async () => {
    mockResultsService = jasmine.createSpyObj('ResultsService', [
      'getMovieDetails',
      'getTVDetails',
      'getGameDetails',
    ]);

    await TestBed.configureTestingModule({
      imports: [MediaComponent, RatingComponent],
      providers: [{ provide: ResultsService, useValue: mockResultsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default poster for missing movie poster', () => {
    component.type = 'movie';
    component.media = {
      id: 1,
      poster_path: '',
      vote_average: 7.5,
      title: '',
      release_date: '',
      overview: '',
      backdrop_path: '',
      genre_ids: [],
      adult: false,
      original_language: '',
      original_title: '',
      popularity: 0,
      video: false,
      vote_count: 0,
      status: '',
      tagline: '',
    };
    component.ngOnInit();
    expect(component.posterUrl).toBe('/assets/images/no-poster.jpg');
  });

  it('should set correct poster URL for movie', () => {
    component.type = 'movie';
    component.media = {
      id: 1,
      poster_path: '/test.jpg',
      vote_average: 7.5,
      title: '',
      release_date: '',
      overview: '',
      backdrop_path: '',
      genre_ids: [],
      adult: false,
      original_language: '',
      original_title: '',
      popularity: 0,
      video: false,
      vote_count: 0,
      status: '',
      tagline: '',
    };
    component.ngOnInit();
    expect(component.posterUrl).toBe(
      'https://image.tmdb.org/t/p/w500/test.jpg'
    );
  });

  it('should set correct poster URL for game', () => {
    component.type = 'game';
    component.media = {
      id: 1,
      name: 'Test Game',
      summary: 'Test Summary',
      cover: { id: 1, image_id: 'test123' },
      rating: 85,
    };
    component.ngOnInit();
    expect(component.posterUrl).toBe(
      'https://images.igdb.com/igdb/image/upload/t_cover_big/test123.webp'
    );
  });

  it('should handle click for movie type', async () => {
    component.type = 'movie';
    component.media = {
      id: 1,
      poster_path: '/test.jpg',
      vote_average: 7.5,
      title: '',
      release_date: '',
      overview: '',
      backdrop_path: '',
      genre_ids: [],
      adult: false,
      original_language: '',
      original_title: '',
      popularity: 0,
      video: false,
      vote_count: 0,
      status: '',
      tagline: '',
    };
    await component.handleClick();
    expect(mockResultsService.getMovieDetails).toHaveBeenCalledWith(1);
  });

  it('should handle click for TV type', async () => {
    component.type = 'tv';
    component.media = {
      id: 1,
      poster_path: '/test.jpg',
      vote_average: 7.5,
      title: '',
      release_date: '',
      overview: '',
      backdrop_path: '',
      genre_ids: [],
      adult: false,
      original_language: '',
      original_title: '',
      popularity: 0,
      video: false,
      vote_count: 0,
      status: '',
      tagline: '',
    };
    await component.handleClick();
    expect(mockResultsService.getTVDetails).toHaveBeenCalledWith(1);
  });

  it('should handle click for game type', async () => {
    component.type = 'game';
    component.media = {
      id: 1,
      name: 'Test Game',
      summary: 'Test Summary',
      cover: { id: 1, image_id: 'test123' },
      rating: 85,
    };
    await component.handleClick();
    expect(mockResultsService.getGameDetails).toHaveBeenCalledWith(1);
  });
});
