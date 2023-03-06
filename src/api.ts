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

export function getMoives(kind: string) {
  return fetch(
    `${BASE_PATH}/movie/${kind}?api_key=${API_KEY}&&language=ko-KR`
  ).then((response) => response.json());
}

export interface IData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface IGetTvResult {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export function getTvs() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&&language=ko-KR`
  ).then((response) => response.json());
}

interface IGenre {
  id: number;
  name: string;
}

export interface IDetailInfo {
  title?: string;
  name?: string;
  id: string;
  overview: string;
  backdrop_path: string;
  genres: IGenre[];
  poster_path: string;
  release_date: string;
  vote_average: number;
  first_air_date: string;
}

export function getDetailInfo(id: string, requestType: string) {
  return fetch(
    `${BASE_PATH}/${requestType}/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

interface ISearchItem {
  backdrop_path: string;
  name?: string;
  title?: string;
  id: number;
  media_type: string;
}

export interface ISearchList {
  results: ISearchItem[];
}

export function getSearchList(query: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${query}&page=1&include_adult=false`
  ).then((res) => res.json());
}
