import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreButton: document.querySelector('.load-more-btn'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  if (refs.loader) {
    refs.loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (refs.loader) {
    refs.loader.classList.add('is-hidden');
  }
}

export function createGallery(images) {
  const galleryMarkup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image"/>
      </a>
      <ul class="image-info">
        <li><p class="image-info-label">Likes</p> <p>${image.likes}</p></li>
        <li><p class="image-info-label">Views</p> <p>${image.views}</p></li>
        <li><p class="image-info-label">Comments</p> <p>${image.comments}</p></li>
        <li><p class="image-info-label">Downloads</p> <p>${image.downloads}</p></li>

      </ul>
    </li>
  `
    )
    .join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

export function clearGallery() {
  refs.galleryContainer.innerHTML = '';
};

export function showLoadMoreButton() {
  refs.loadMoreButton.classList.remove('is-hidden');
};

export function hideLoadMoreButton() {
  refs.loadMoreButton.classList.add('is-hidden');
};
