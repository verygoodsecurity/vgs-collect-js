import { ERROR_MESSAGE } from '../constants';

const appendElement = (elem: HTMLScriptElement | HTMLLinkElement) => {
  const target = document.head || document.body;

  if (!target) {
    throw new Error(
      ERROR_MESSAGE.UNABLE_TO_FIND('document.head or document.body')
    );
  }

  target.appendChild(elem);
  return elem;
};

const appendLink = (rel: string, href: string) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  appendElement(link);
};

export { appendElement, appendLink };
