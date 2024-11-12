import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MediaComponent } from '@modules/media/media.component';
import { Game } from '@services/games.service';
import { Movie } from '@services/movies.service';
import { ResultsService } from '@services/results.service';
import { TV } from '@services/tv.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MediaComponent],
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  results$;
  movies: Movie[] = [];
  tvShows: TV[] = [];
  games: Game[] = [];

  constructor(private resultsService: ResultsService) {
    this.results$ = this.resultsService.results$;
  }

  ngOnInit() {
    this.results$.subscribe((results) => {
      if (results.movies) this.movies = results.movies;
      if (results.tvShows) this.tvShows = results.tvShows;
      if (results.games) this.games = results.games;

      setTimeout(() => {
        this.scrollContainers.forEach((container) => {
          container.nativeElement.scrollLeft = 0;
        });
      });
    });
  }
}
