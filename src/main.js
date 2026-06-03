import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  showLoader,
  hideLoader,
  createGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const refs = {
  form: document.querySelector('.form'),
  loadMoreButton: document.querySelector('.load-more-btn'),
};

let currentQuery = '';
let page = 1;

async function fetchImages(query, page = 1) {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);

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
      if (isCanLoadMore(data.totalHits, PER_PAGE)) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
      return data.hits.length;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch images with the ${error}. Please try again later.`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onSubmit(event) {
  event.preventDefault();
  clearGallery();
  hideLoadMoreButton();

  const query = event.target.elements['search-text'].value.trim();
  currentQuery = query;

  if (query) {
    page = 1;
    await fetchImages(query, page);
    refs.form.reset();
  } else {
    iziToast.warning({
      title: 'Empty Query',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
  }
}

async function onLoadMore() {
  page += 1;
  const res = await fetchImages(currentQuery, page);

  if (res) {
    const galleryItemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: galleryItemHeight * 2,
      behavior: 'smooth',
    });
  }
}

function isCanLoadMore(totalHits, perPage) {
  const totalPages = Math.ceil(totalHits / perPage);
  return page < totalPages;
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMore);
