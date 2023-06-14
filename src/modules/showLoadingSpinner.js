import { refs } from './refs.js';

export default function showLoadingSpinner() {
  refs.loadingMsg.classList.remove('visually-hidden');
}
