import { Genres } from '@shared/constants/genres';
import { environment } from '@environments/environment';
import { CUSTOM_IGDB_URL } from '@shared/constants/urls';

export interface Game {
  id: number;
  name: string;
  summary: string;
  cover?: {
    id: number;
    image_id: string;
  };
  rating?: number;
  release_dates?: {
    id: number;
    date: number;
  }[];
  genres?: {
    id: number;
    name: string;
  }[];
  artworks?: {
    id: number;
    image_id: string;
  }[];
  screenshots?: {
    id: number;
    image_id: string;
  }[];
}

const GameGenres = {
  [Genres.ACTION]: 1,
  [Genres.COMEDY]: 27,
  [Genres.DRAMA]: 31,
  [Genres.SCIFI]: 18,
  [Genres.HORROR]: 19,
  [Genres.FANTASY]: 17,
  [Genres.THRILLER]: 20,
};

enum Theme {
  Action = 1,
  Fantasy = 17,
  ScienceFiction = 18,
  Horror = 19,
  Thriller = 20,
  Survival = 21,
  Historical = 22,
  Stealth = 23,
  Comedy = 27,
  Drama = 31,
  NonFiction = 32,
  Sandbox = 33,
  Kids = 35,
  Warfare = 39,
  Mystery = 43,
  Romance = 44,
}

const BASE_URL = CUSTOM_IGDB_URL;
const API_KEY = environment.igdb_api_key;

const API_OPTIONS = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'x-api-key': API_KEY,
  },
};

// Get games by genre
export const getGamesByGenre = async (
  genre: Genres,
  limit: number = 20
): Promise<Game[]> => {
  const genreId = GameGenres[genre];
  try {
    const response = await fetch(`${BASE_URL}/games`, {
      ...API_OPTIONS,
      body: `
fields name,rating, first_release_date, rating_count, cover.image_id;where rating_count > 0 & themes = (${genreId}); sort rating_count desc; limit 100;
        `,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games by genre:', error);
    throw error;
  }
};

// Get game details
export const getGameDetails = async (gameId: number): Promise<Game> => {
  try {
    const response = await fetch(`${BASE_URL}/games`, {
      ...API_OPTIONS,
      body: `
fields name,summary,cover.image_id,rating,release_dates.*,genres.*,screenshots.*,videos.*,platforms.*,involved_companies.company.name, artworks.*, screenshots.*;where id = ${gameId};
        `,
    });
    const [data] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};
