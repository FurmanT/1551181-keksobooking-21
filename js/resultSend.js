'use strict';

const errorTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

const renderError = (text) => {
  const errorElement = errorTemplate.cloneNode(true);
  const p = errorElement.querySelector(`.error__message`);
  p.textContent = text;
  return errorElement;
};

const showError = (text) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderError(text));
  return fragment;
};

const successTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const renderSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  return successElement;
};

const showSuccess = () => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderSuccess());
  return fragment;
};

window.resultSend = {
  showError,
  showSuccess,
};
