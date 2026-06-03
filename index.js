import{a as f,S as p,i as n}from"./assets/vendor-BezXTN6Z.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const d="56104440-fcdbabdb32ae6a10913613c12",m="https://pixabay.com/api/";function g(o){return f.get(m,{params:{key:d,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:200}}).then(e=>e.data)}const s=document.querySelector(".loader"),u=document.querySelector(".gallery"),h=new p(".gallery a",{captionsData:"alt",captionDelay:250});function y(){s&&s.classList.remove("is-hidden")}function b(){s&&s.classList.add("is-hidden")}function L(o){const e=o.map(i=>`
    <li class="gallery-item">
      <a href="${i.largeImageURL}">
        <img src="${i.webformatURL}" alt="${i.tags}" class="gallery-image"/>
      </a>
      <ul class="image-info">
        <li><p class="image-info-label">Likes</p> <p>${i.likes}</p></li>
        <li><p class="image-info-label">Views</p> <p>${i.views}</p></li>
        <li><p class="image-info-label">Comments</p> <p>${i.comments}</p></li>
        <li><p class="image-info-label">Downloads</p> <p>${i.downloads}</p></li>

      </ul>
    </li>
  `).join("");u.insertAdjacentHTML("beforeend",e),h.refresh()}function w(){u.innerHTML=""}const l=document.querySelector(".form");function S(o){y(),g(o).then(e=>{if(e.hits.length===0){n.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}else L(e.hits)}).catch(e=>{n.error({title:"Error",message:`Failed to fetch images with the ${e}. Please try again later.`,position:"topRight"})}).finally(()=>{b(),l.reset()})}function q(o){o.preventDefault(),w();const e=l.elements["search-text"].value.trim();e?S(e):n.warning({title:"Empty Query",message:"Please enter a search query.",position:"topRight"})}l.addEventListener("submit",q);
//# sourceMappingURL=index.js.map
