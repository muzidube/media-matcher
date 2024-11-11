import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { ResultsService } from '@services/results.service';
import { BehaviorSubject } from 'rxjs';
import { HeroComponent } from '@core/components/hero/hero.component';
import { ResultsComponent } from '@core/components/results/results.component';
import { DetailsComponent } from '@core/components/details/details.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let mockResultsService: jasmine.SpyObj<ResultsService>;
  let resultsSubject: BehaviorSubject<any>;
  let selectedMediaSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    resultsSubject = new BehaviorSubject({
      movies: [],
      tvShows: [],
      games: [],
    });
    selectedMediaSubject = new BehaviorSubject(null);

    mockResultsService = jasmine.createSpyObj('ResultsService', [], {
      results$: resultsSubject.asObservable(),
      selectedMedia$: selectedMediaSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [
        ViewComponent,
        HeroComponent,
        ResultsComponent,
        DetailsComponent,
      ],
      providers: [{ provide: ResultsService, useValue: mockResultsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect when results are available', (done) => {
    resultsSubject.next({
      movies: [{ id: 1 }],
      tvShows: [],
      games: [],
    });

    component.hasResults$.subscribe((hasResults) => {
      expect(hasResults).toBe(true);
      done();
    });
  });

  it('should detect when details are available', (done) => {
    selectedMediaSubject.next({
      details: { id: 1 },
    });

    component.hasDetails$.subscribe((hasDetails) => {
      expect(hasDetails).toBe(true);
      done();
    });
  });
});
