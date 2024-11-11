import { Component } from '@angular/core';
import { GenreButtonComponent } from '@modules/home/components/genre-button/genre-button.component';
import { getMoviesByGenre, Movie } from '@services/movies.service';
import { Genres } from '@shared/constants/genres';
import { getTVByGenre, TV } from '@services/tv.service';
import { Game, getGamesByGenre } from '@services/games.service';
import { ResultsService } from '@services/results.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [GenreButtonComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  genres = Object.values(Genres);
  selectedGenre = '';
  isLoading = false;
  imgUrl = 'images/magic-box.jpg';

  constructor(private resultsService: ResultsService) {}

  async handleGenreSelection(genre: string): Promise<void> {
    this.isLoading = true;
    this.selectedGenre = genre;

    try {
      const [moviesResult, tvShowsResult, gamesResult] =
        await Promise.allSettled([
          getMoviesByGenre(genre as Genres),
          getTVByGenre(genre as Genres),
          getGamesByGenre(genre as Genres),
        ]);

      const results: {
        movies?: Movie[];
        tvShows?: TV[];
        games?: Game[];
      } = {};

      if (moviesResult.status === 'fulfilled') {
        results.movies = moviesResult.value.results;
      }

      if (tvShowsResult.status === 'fulfilled') {
        results.tvShows = tvShowsResult.value.results;
      }

      if (gamesResult.status === 'fulfilled') {
        results.games = gamesResult.value;
      }

      this.resultsService.updateResults(results);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      this.isLoading = false;
      this.selectedGenre = '';
      setTimeout(() => {
        document
          .getElementById('results')
          ?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenre === genre;
  }
}
