import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  showLoader,
  hideLoader,
  createGallery,
  clearGallery,
} from './js/render-functions.js';

const form = document.querySelector('.form');

function fetchImages(query) {
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      } else {
        createGallery(data.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Failed to fetch images with the ${error}. Please try again later.`,
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function onSubmit(event) {
  event.preventDefault();
  clearGallery();

  const query = form.elements['search-text'].value.trim();

  if (query) {
    fetchImages(query);
  } else {
    iziToast.warning({
      title: 'Empty Query',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
  }
}

form.addEventListener('submit', onSubmit);
