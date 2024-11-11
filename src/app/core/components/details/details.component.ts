import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultsService } from '@services/results.service';
import { Movie } from '@services/movies.service';
import { TV } from '@services/tv.service';
import { Game } from '@services/games.service';
import { RatingComponent } from '@shared/ui/rating/rating.component';
import formatDate from '@shared/utils/dateFormatter';

interface DisplayDetails {
  title: string;
  posterPath: string;
  backgroundPath: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  status: string;
  tagline?: string;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  displayDetails?: DisplayDetails;
  mediaType: 'movie' | 'tv' | 'game' | null = null;
  moreInfoUrl: string | null = null;
  iconUrl = '';

  imgUrl = '';
  watchlist = 'Watchlist';
  favourites = 'Favourites';
  watched = 'Watched';

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.subscription = this.resultsService.selectedMedia$.subscribe(
      (selectedMedia) => {
        if (selectedMedia?.details) {
          this.mediaType = selectedMedia.type;
          this.setDisplayDetails(selectedMedia.type, selectedMedia.details);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setDisplayDetails(
    type: 'movie' | 'tv' | 'game',
    details: Movie | TV | Game
  ): void {
    switch (type) {
      case 'movie':
        const movie = details as Movie;
        this.displayDetails = {
          title: movie.original_title,
          posterPath: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          backgroundPath: `	https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`,
          releaseDate: formatDate(movie.release_date),
          overview: movie.overview,
          voteAverage: Math.round(movie.vote_average * 10),
          status: movie.status,
          tagline: movie.tagline,
        };
        this.moreInfoUrl = `https://www.justwatch.com/uk/movie/${this.displayDetails?.title
          .toLowerCase()
          .replace(/\s+/g, '-')}`;
        this.iconUrl = 'images/justwatch.png';
        break;

      case 'tv':
        const tv = details as TV;
        this.displayDetails = {
          title: tv.name,
          posterPath: `https://image.tmdb.org/t/p/w500/${tv.poster_path}`,
          backgroundPath: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${tv.backdrop_path}`,
          releaseDate: formatDate(tv.first_air_date),
          overview: tv.overview,
          voteAverage: Math.round(tv.vote_average * 10),
          status: tv.status,
          tagline: tv.tagline,
        };
        this.moreInfoUrl = `https://www.justwatch.com/uk/tv-series/${this.displayDetails?.title
          .toLowerCase()
          .replace(/\s+/g, '-')}`;
        this.iconUrl = 'images/justwatch.png';
        break;

      case 'game':
        const game = details as Game;
        let backgroundImageId = game.cover?.image_id;

        if (game.artworks && game.artworks?.length > 0) {
          backgroundImageId = game.artworks[0].image_id;
        } else if (game.screenshots && game.screenshots?.length > 0) {
          backgroundImageId = game.screenshots[0].image_id;
        }
        this.displayDetails = {
          title: game.name,
          posterPath: `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover?.image_id}.webp`,
          backgroundPath: `https://images.igdb.com/igdb/image/upload/t_1080p/${backgroundImageId}.webp`,
          releaseDate: game.release_dates?.[0]?.date
            ? formatDate(
                new Date(game.release_dates[0].date * 1000).toISOString()
              )
            : 'N/A',
          overview: game.summary || '',
          voteAverage: Math.round(game.rating || 0),
          status: '',
        };
        this.moreInfoUrl = `https://isthereanydeal.com/game/${this.displayDetails?.title
          .toLowerCase()
          .replace(/\s+/g, '-')}/info/`;
        this.iconUrl = 'images/isthereanydeal.jpg';
        break;
    }
  }
}
