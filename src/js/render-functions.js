import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.add('is-hidden');
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
  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
};
