'use strict';
const WIDTH = 50;
const HEIGTH = 70;
const MAX_PIN_COUNT = 5;

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const createElementPin = function (pin, index) {
  const pinElement = pinTemplate.cloneNode(true);
  const img = pinElement.querySelector(`img`);
  img.alt = pin.offer.title;
  img.src = pin.author.avatar;
  img.setAttribute("data-id", index);
  pinElement.style = `left: ${pin.location.x - (WIDTH / 2)}px; top: ${pin.location.y - HEIGTH}px;`;
  return pinElement;
};

const render = function (arrayPin) {
  const count = Math.min(arrayPin.length, MAX_PIN_COUNT);
  const fragment = document.createDocumentFragment();
  const arrCount = Array.from({length: count}, function (v, i) {
    return i;
  });
  arrCount.forEach(function (item) {
    fragment.appendChild(createElementPin(arrayPin[item], item));
  });
  return fragment;
};

window.pin = {
  render: render,
};

