import { Component, Input } from '@angular/core';
import { Game } from '@services/games.service';
import { Movie } from '@services/movies.service';
import { ResultsService } from '@services/results.service';
import { TV } from '@services/tv.service';
import { RatingComponent } from '@shared/ui/rating/rating.component';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './media.component.html',
})
export class MediaComponent {
  @Input() media?: Movie | TV | Game;
  @Input() type: 'movie' | 'tv' | 'game' = 'movie';
  posterUrl: string = '';
  releaseDate: string = '';
  rating: number = 20;

  private readonly TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';
  private readonly IGDB_IMG_URL =
    'https://images.igdb.com/igdb/image/upload/t_cover_big';
  private readonly DEFAULT_IMG = '/assets/images/no-poster.jpg';

  constructor(private resultsService: ResultsService) {}

  ngOnInit() {
    this.setPosterUrl();
  }

  private setPosterUrl(): void {
    if (!this.media) {
      this.posterUrl = this.DEFAULT_IMG;
      return;
    }

    switch (this.type) {
      case 'movie':
      case 'tv':
        const mediaWithPoster = this.media as Movie | TV;
        this.posterUrl = mediaWithPoster.poster_path
          ? `${this.TMDB_IMG_URL}${mediaWithPoster.poster_path}`
          : this.DEFAULT_IMG;
        this.rating = Math.round(mediaWithPoster.vote_average * 10);
        break;

      case 'game':
        const game = this.media as Game;
        this.posterUrl = game.cover?.image_id
          ? `${this.IGDB_IMG_URL}/${game.cover.image_id}.webp`
          : this.DEFAULT_IMG;
        this.rating = Math.round(game.rating || 0);
        break;

      default:
        this.posterUrl = this.DEFAULT_IMG;
    }
  }

  async handleClick(): Promise<void> {
    if (!this.media?.id) return;

    switch (this.type) {
      case 'movie':
        await this.resultsService.getMovieDetails(this.media.id);
        break;
      case 'tv':
        await this.resultsService.getTVDetails(this.media.id);
        break;
      case 'game':
        await this.resultsService.getGameDetails(this.media.id);
        break;
    }
    setTimeout(() => {
      document
        .getElementById('details')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
