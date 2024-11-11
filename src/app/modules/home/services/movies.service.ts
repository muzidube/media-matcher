import { Genres } from '@shared/constants/genres';
import { environment } from '@environments/environment';
import { TMDB_BASE_URL } from '@shared/constants/urls';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const MovieGenres = {
  [Genres.ACTION]: 28,
  [Genres.COMEDY]: 35,
  [Genres.DRAMA]: 18,
  [Genres.SCIFI]: 878,
  [Genres.HORROR]: 27,
  [Genres.FANTASY]: 14,
  [Genres.THRILLER]: 53,
};

const BASE_URL = TMDB_BASE_URL;
const API_KEY = environment.tmdb_api_key;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

// Get movies by genre ID
export const getMoviesByGenre = async (
  genre: Genres,
  page: number = 1
): Promise<MovieResponse> => {
  const genreId = MovieGenres[genre];
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=${genreId}&vote_count.gte=50&page=${page}`,
      API_OPTIONS
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
      API_OPTIONS
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
