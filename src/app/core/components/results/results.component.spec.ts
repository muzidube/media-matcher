import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { ResultsService } from '@services/results.service';
import { BehaviorSubject } from 'rxjs';
import { MediaComponent } from '@modules/media/media.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let resultsSubject: BehaviorSubject<any>;

  const mockData = {
    movie: {
      adult: false,
      backdrop_path: '/path/to/backdrop.jpg',
      genre_ids: [1, 2, 3],
      id: 1,
      original_language: 'en',
      original_title: 'Test Movie',
      overview: 'Test overview',
      popularity: 8.5,
      poster_path: '/path/to/poster.jpg',
      release_date: '2024-03-20',
      status: 'Released',
      tagline: 'Test tagline',
      title: 'Test Movie',
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    },
    tvShow: {
      adult: false,
      backdrop_path: '/path/to/backdrop.jpg',
      genre_ids: [1, 2, 3],
      id: 1,
      original_language: 'en',
      original_name: 'Test Show Original',
      overview: 'Test overview',
      popularity: 8.5,
      poster_path: '/path/to/poster.jpg',
      first_air_date: '2024-03-20',
      status: 'Released',
      tagline: 'Test tagline',
      name: 'Test Show',
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    },
    game: {
      id: 1,
      name: 'Test Game',
      cover: { id: 1, image_id: '' },
      summary: '',
      rating: 0,
    },
  };

  beforeEach(async () => {
    resultsSubject = new BehaviorSubject({
      movies: [],
      tvShows: [],
      games: [],
    });

    await TestBed.configureTestingModule({
      imports: [ResultsComponent, MediaComponent],
      providers: [
        {
          provide: ResultsService,
          useValue: { results$: resultsSubject.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update all media types', () => {
    resultsSubject.next({
      movies: [mockData.movie],
      tvShows: [mockData.tvShow],
      games: [mockData.game],
    });

    expect(component.movies[0]).toEqual(mockData.movie);
    expect(component.tvShows[0]).toEqual(mockData.tvShow);
    expect(component.games[0]).toEqual(mockData.game);
  });

  it('should handle empty results', () => {
    resultsSubject.next({
      movies: [],
      tvShows: [],
      games: [],
    });

    expect(component.movies).toEqual([]);
    expect(component.tvShows).toEqual([]);
    expect(component.games).toEqual([]);
  });
});
