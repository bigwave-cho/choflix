/*
TMDB API
https://www.themoviedb.org/

API DOCS
https://developers.themoviedb.org/3/getting-started/introduction
*/

const API_KEY = '7016bd592613a2113a15c8d01f096aff';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
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
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMoives() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&&language=ko-KR`
  ).then((response) => response.json());
}
