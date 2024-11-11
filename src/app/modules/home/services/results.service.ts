import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getMovieDetails, Movie } from './movies.service';
import { getTVDetails, TV } from './tv.service';
import { Game, getGameDetails } from './games.service';

interface MediaResults {
  movies?: Movie[];
  tvShows?: TV[];
  games?: Game[];
}

interface SelectedMedia {
  type: 'movie' | 'tv' | 'game';
  details: Movie | TV | Game | null;
}

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private resultsSubject = new BehaviorSubject<MediaResults>({});
  private selectedMediaSubject = new BehaviorSubject<SelectedMedia | null>(
    null
  );

  results$ = this.resultsSubject.asObservable();
  selectedMedia$ = this.selectedMediaSubject.asObservable();

  updateResults(results: MediaResults) {
    this.resultsSubject.next(results);
  }

  async getMovieDetails(id: number) {
    try {
      const details = await getMovieDetails(id);
      this.selectedMediaSubject.next({ type: 'movie', details });
    } catch (error) {
      console.error('Error fetching movie details:', error);
      this.selectedMediaSubject.next({ type: 'movie', details: null });
    }
  }

  async getTVDetails(id: number) {
    try {
      const details = await getTVDetails(id);
      this.selectedMediaSubject.next({ type: 'tv', details });
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      this.selectedMediaSubject.next({ type: 'tv', details: null });
    }
  }

  async getGameDetails(id: number) {
    try {
      const details = await getGameDetails(id);
      this.selectedMediaSubject.next({ type: 'game', details });
    } catch (error) {
      console.error('Error fetching game details:', error);
      this.selectedMediaSubject.next({ type: 'game', details: null });
    }
  }
}
