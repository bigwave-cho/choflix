/*
TMDB API
https://www.themoviedb.org/

API DOCS
https://developers.themoviedb.org/3/getting-started/introduction
*/

const API_KEY = '7016bd592613a2113a15c8d01f096aff';
const BASE_PATH = 'https://api.themoviedb.org/3';

export function getMoives() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
