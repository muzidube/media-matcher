import { Genres } from '@shared/constants/genres';
import { environment } from '@environments/environment';
import { TMDB_BASE_URL } from '@shared/constants/urls';

export interface TV {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  status: string;
  tagline: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TVResponse {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}

const TVGenres = {
  [Genres.ACTION]: 10759,
  [Genres.COMEDY]: 35,
  [Genres.DRAMA]: 18,
  [Genres.SCIFI]: 10765,
  [Genres.HORROR]: 9648,
  [Genres.FANTASY]: 10766,
  [Genres.THRILLER]: 9648,
};

const BASE_URL = TMDB_BASE_URL;
const API_KEY = environment.tmdb_api_key;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};
// Get TV shows by genre ID
export const getTVByGenre = async (
  genre: Genres,
  page: number = 1
): Promise<TVResponse> => {
  const genreId = TVGenres[genre];
  try {
    const response = await fetch(
      `${BASE_URL}/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=${genreId}&vote_count.gte=50&page=${page}`,
      API_OPTIONS
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    throw error;
  }
};

// Get TV show details by ID
export const getTVDetails = async (tvId: number): Promise<TV> => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`,
      API_OPTIONS
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};
