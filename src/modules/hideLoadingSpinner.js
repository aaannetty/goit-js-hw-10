import { refs } from './refs.js';

export default function hideLoadingSpinner() {
  refs.loadingMsg.classList.add('visually-hidden');
}
