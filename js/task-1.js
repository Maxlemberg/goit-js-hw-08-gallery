import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');

const addTag = function (tag, tagClassName, ...atributes) {
  const tagName = document.createElement(tag);
  if (tagClassName) {
    tagName.classList.add(tagClassName);
  }
  if (atributes.length > 0) {
    atributes.forEach((item, i) =>
      tagName.setAttribute(item, `${Object.values(this)[i]}`),
    );
  }
  return tagName;
};

const createOutsideEl = function (parentsEl, ...elements) {
  const el = elements.reduce((acc, item) => {
    if (acc !== item) {
      acc.append(item);
      return acc;
    }
  });
  parentsEl.append(el);
};

const galleryArrList = gallery.map((obj, i) => {
  const elementLi = addTag.call(obj, 'li', 'gallery__item');
  const elementA = addTag.call(obj, 'a', 'gallery__link', 'href');
  const elemetImg = addTag.call(
    obj,
    'img',
    'gallery__image',
    'src',
    'data-source',
    'alt',
  );
  elemetImg.id = i;
  createOutsideEl(elementLi, elementA, elemetImg);
  return elementLi;
});

galleryRef.append(...galleryArrList);

const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = modalRef.querySelector('.lightbox__image');
const closeBtnRef = modalRef.querySelector('[data-action="close-lightbox"]');
let idImg = 0;

const handleOpenModal = function (event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    modalRef.classList.add('is-open');
    modalImgRef.src = event.target.dataset.source;
  }
  idImg = parseInt(event.target.id);

  window.addEventListener('keyup', flipImg);
};

function flipImg({ key }) {
  if (key === 'Escape') {
    modalRef.classList.remove('is-open');
    modalImgRef.src = '';
  }
  if (key === 'ArrowRight') {
    idImg += 1;
    if (idImg < Number(gallery.length)) {
      modalImgRef.src = this[idImg].dataset.source;
    } else {
      idImg -= 1;
      alert('Останній елемент в галереї!');
    }
  }
  if (key === 'ArrowLeft') {
    idImg -= 1;
    if (idImg >= 0) {
      modalImgRef.src = this[idImg].dataset.source;
    } else {
      idImg += 1;
      alert('Останній елемент в галереї!');
    }
  }
}

const handleCloseModal = function (event) {
  if (
    event.target === closeBtnRef ||
    event.target === modalRef.firstElementChild
  ) {
    modalRef.classList.remove('is-open');
    modalImgRef.src = '';
  }
};

galleryRef.addEventListener('click', handleOpenModal);
modalRef.addEventListener('click', handleCloseModal);
