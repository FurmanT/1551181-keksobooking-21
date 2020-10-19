'use strict';
(function () {
  const WIDTH = 50;
  const HEIGTH = 70;

  const advertisingTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const renderAdvertising = function (advertising, index) {
    const advertisingElement = advertisingTemplate.cloneNode(true);
    const img = advertisingElement.querySelector(`img`);
    img.alt = advertising.offer.title;
    img.src = advertising.author.avatar;
    img.setAttribute("data-id", index);
    advertisingElement.style = `left: ${advertising.location.x + (WIDTH / 2)}px; top: ${advertising.location.y + HEIGTH}px;`;
    return advertisingElement;
  };

  const create = function (arrayAdvertising) {
    const fragment = document.createDocumentFragment();

    arrayAdvertising.forEach((item, index) => {
      fragment.appendChild(renderAdvertising(item, index));
    });
    return fragment;
  };

  window.pin = {
    create: create,
  };
})();
