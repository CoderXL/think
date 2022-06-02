import { DOCUMENT_COVERS } from '@think/constants';

const preloadImage = (url) => {
  requestIdleCallback(() => {
    const image = document.createElement('img');
    image.src = url;
  });
};

export function preload() {
  if (typeof window === 'undefined') return;
  DOCUMENT_COVERS.forEach(preloadImage);
}
