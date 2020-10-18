'use strict';
(function () {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGTH = 65;
  const blockMap = document.querySelector(".map");
  const mapListElement = blockMap.querySelector(`.map__pins`);
  const mainPin = mapListElement.querySelector('.map__pin--main');

  const arrayAdvertising = window.date.createArrayAdvertising();

  const setActiveMap = function () {
    blockMap.classList.remove("map--faded");
    mapListElement.appendChild(window.pin.create(arrayAdvertising));
    mapListElement.addEventListener("click", function (evt) {
      let dataId = evt.target.getAttribute("data-id");
      if (evt.target.tagName === "IMG" && dataId) {
        const elementCard = mapListElement.querySelector(".map__card");
        if (!elementCard) {
          mapListElement.appendChild(window.card.createCard(arrayAdvertising[dataId]));
          const elementClosePopup = mapListElement.querySelector(".popup__close");
          elementClosePopup.addEventListener('click', deleteCard);
        }
      }
    });
  };

  const deleteCard = function (evt) {
    evt.preventDefault();
    const elementCard = mapListElement.querySelector(".map__card");
    elementCard.remove();
  };

  const fnActiveState = window.page.setActiveState();

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.form.setMoveAddressFieldAd();
      fnActiveState();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      fnActiveState();
    }
  });

  window.map = {
    getSizeMainPin: function () {
      return {
        width: MAIN_PIN_WIDTH,
        heigth: MAIN_PIN_HEIGTH
      };
    },
    setActive: setActiveMap,
  };
})();
