import showLoadingSpinner from './modules/showLoadingSpinner';
import hideLoadingSpinner from './modules/hideLoadingSpinner';
import { refs } from './modules/refs.js';

const API_KEY =
  'live_AYkAoqlLMCSHvtK6XiY9m9pGvm6LmIh6QOoxDNzc5jtqoNmIhr0lhBCz9xVz813y';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
export function fetchCatByBreed(breedId) {
  // showLoadingSpinner();
  // refs.loaderText.classList.remove('visually-hidden');

  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
