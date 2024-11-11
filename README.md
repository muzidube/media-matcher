# Media Matcher

## Overview

Media Matcher is an interactive application designed to help users discover movies, TV shows, and games based on their preferred genres. The app provides a streamlined experience where users can:

- Browse media by selecting specific genres
- View detailed information about each title
- Find where to watch movies and TV shows through JustWatch
- Discover the best deals for games via IsThereAnyDeal

## Features

- Genre-based media recommendations
- Comprehensive media details
- Direct links to streaming/purchasing/deal options
- Integration with:
  - TMDB API for movie and TV show lists
  - IGDB API for game lists
  - JustWatch for movies and TV shows streaming/buying options
  - IsThereAnyDeal for game pricing

## Screenshots
_Homepage with genre selection_
<img width="1680" alt="image" src="https://github.com/user-attachments/assets/57f95131-3e64-47a9-8385-39df2a238931">
_Media lists after genre selection_
<img width="1680" alt="image" src="https://github.com/user-attachments/assets/5d7c5abf-80b5-4d03-9253-31546e888dd2">
_Detailed view of selected media_
<img width="1680" alt="image" src="https://github.com/user-attachments/assets/1480862f-2560-4f40-a560-0d1340907d37">

## Tech Stack

- Angular 18.2.11
- TypeScript
- Angular Material
- Tailwind
- HTML5
- REST APIs

## Prerequisites

- Node.js (v16.x or higher)
- Angular CLI (v18.2.11)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
4. Set up environment variables

- Copy `src/environments/environment.template.ts` to `src/environments/environment.ts`
- Add your API keys for TMDB and IGDB

5. Start the development server (ng serve or npm start)
   The application will be available at `http://localhost:4200`

## Configuration

### API Keys

1. TMDB API Key

   - Visit [TMDB API](https://www.themoviedb.org/documentation/api)
   - Create an account and request an API key
   - Add the key to your environment file

2. IGDB API Key

   - Visit [IGDB API](https://api-docs.igdb.com/)
   - Create an account and request an API key
   - Add the key to your environment file

## Acknowledgments

- TMDB for movie and TV show data
- IGDB for game data
- JustWatch for streaming information
- IsThereAnyDeal for game pricing
