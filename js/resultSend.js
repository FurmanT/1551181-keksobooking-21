'use strict';

  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  const renderError = function (text) {
    const errorElement = errorTemplate.cloneNode(true);
    const p = errorElement.querySelector(`.error__message`);
    p.textContent = text;
    return errorElement;
  };

  const showError = function (text) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderError(text));
    return fragment;
  };

  const successTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

  const renderSuccess = function () {
    const successElement = successTemplate.cloneNode(true);
    return successElement;
  };

  const showSuccess = function () {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderSuccess());
    return fragment;
  };

  window.resultSend = {
    showError: showError,
    showSuccess: showSuccess,
  };
