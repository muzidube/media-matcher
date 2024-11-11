import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '../../../../core/components/hero/hero.component';
import { ResultsComponent } from 'src/app/core/components/results/results.component';
import { DetailsComponent } from 'src/app/core/components/details/details.component';
import { map } from 'rxjs';
import { ResultsService } from '@services/results.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HeroComponent, ResultsComponent, DetailsComponent, CommonModule],
  templateUrl: './view.component.html',
})
export class ViewComponent {
  hasResults$: Observable<boolean>;
  hasDetails$: Observable<boolean>;

  constructor(private resultsService: ResultsService) {
    this.hasResults$ = this.resultsService.results$.pipe(
      map((results) => {
        return Boolean(
          results.movies?.length ||
            results.tvShows?.length ||
            results.games?.length
        );
      })
    );

    this.hasDetails$ = this.resultsService.selectedMedia$.pipe(
      map((selectedMedia) => Boolean(selectedMedia?.details))
    );
  }
}
