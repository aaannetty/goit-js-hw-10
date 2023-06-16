import hideLoadingSpinner from './modules/hideLoadingSpinner';
import { refs } from './modules/refs.js';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import showLoadingSpinner from './modules/showLoadingSpinner';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

let isFirstLoad = true;

showLoadingSpinner();
refs.selector.classList.add('visually-hidden');
refs.errorMsg.classList.add('visually-hidden');

refs.loaderText.classList.remove('visually-hidden');

fetchBreeds()
  .then(data => {
    hideLoadingSpinner();
    refs.selector.classList.remove('visually-hidden');
    refs.errorMsg.classList.add('visually-hidden');
    refs.loaderText.classList.add('visually-hidden');

    const breedOptions = data.map(breed => ({
      value: breed.id,
      text: breed.name,
    }));
    new SlimSelect({
      select: refs.selector,
      data: breedOptions,
      onChange: () => {
        const dropdown = document.querySelector('.ss-main .ss-dropdown');
        dropdown.classList.add('custom-colors');
      },
    });

    refs.infoArea.classList.remove('visually-hidden');
  })
  .catch(error => {
    hideLoadingSpinner();
    refs.errorMsg.classList.remove('visually-hidden');
    console.error('Error:', error.name, error.message);
    refs.loaderText.classList.add('visually-hidden');
  });

refs.selector.addEventListener('change', onChangeSelect);
function onChangeSelect() {
  if (isFirstLoad) {
    isFirstLoad = false;
    return;
  }
  const breedId = refs.selector.value;

  refs.infoArea.classList.add('visually-hidden');
  refs.loaderText.classList.remove('visually-hidden');
  refs.loadingMsg.classList.remove('visually-hidden');

  fetchCatByBreed(breedId)
    .then(data => {
      if (data && data.length > 0) {
        hideLoadingSpinner();
        refs.loaderText.classList.add('visually-hidden');
        return data[0];
      }
    })

    .then(breedData => {
      if (breedData) {
        console.log(breedData);
        const { url, breeds } = breedData;
        const { name, description, temperament, origin, weight } = breeds[0];

        const markup = `
          <div id="infoArea">
            <img class="breed-img" src="${url}" style="max-width: 560px;">
            <h2 class="breed-name">${name}</h2>
            <p class="breed-description">${description}</p>
            <p class="breed-temperament"><b>Temperament 🐱: </b>${temperament}</p>
            <p class="breed-origin"><b>Origin 🌎: </b>${origin}</p>
            <p class="breed-weight"><b>Weight 🐈: </b>${weight.imperial}</p>
          </div>
        `;

        refs.infoArea.innerHTML = markup;
      }
      refs.infoArea.classList.remove('visually-hidden');
    })

    .catch(() => {
      hideLoadingSpinner();
      refs.loaderText.classList.add('visually-hidden');
      refs.errorMsg.classList.remove('visually-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
