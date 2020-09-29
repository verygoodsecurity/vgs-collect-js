const appendElement = (elem: HTMLScriptElement | HTMLLinkElement) => {
  const target = document.head || document.body;

  if (!target) {
    throw new Error('Unable to find document.head or document.body');
  }

  target.append(elem);
  return elem;
};

const appendLink = (rel: string, href: string) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  appendElement(link);
};

export { appendElement, appendLink };
