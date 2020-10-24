'use strict';
(function () {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGTH = 65;
  const blockMap = document.querySelector(".map");
  const mapListElement = blockMap.querySelector(`.map__pins`);
  const mainPin = mapListElement.querySelector('.map__pin--main');
  const Y_INIT_MAP = 130;
  const Y_HEIGTH_MAP = 630;

  const createAdvertisingPin = function (array) {
    mapListElement.appendChild(window.pin.create(array));
    mapListElement.addEventListener("click", function (evt) {
      let dataId = evt.target.getAttribute("data-id");
      if (evt.target.tagName === "IMG" && dataId) {
        const elementCard = mapListElement.querySelector(".map__card");
        if (!elementCard) {
          mapListElement.appendChild(window.card.create(array[dataId]));
          const elementClosePopup = mapListElement.querySelector(".popup__close");
          elementClosePopup.addEventListener('click', deleteCard);
        }
      }
    });
  };

  const onErrorGetData = function (error) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  const setActiveMap = function () {
    blockMap.classList.remove("map--faded");
    try {
      window.server.loadData(createAdvertisingPin, onErrorGetData);
    } catch (error) {
      onErrorGetData(`Ошибка при получении данных: ${error.message}`);
    }
  };

  const deleteCard = function (evt) {
    evt.preventDefault();
    const elementCard = mapListElement.querySelector(".map__card");
    elementCard.remove();
  };

  const fnActiveState = window.page.setActiveState();

  const moveMainPin = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      fnActiveState();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        const infoBlockMap = blockMap.getClientRects();
        const blockMapWidth = infoBlockMap[0].width;
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        const X = mainPin.offsetLeft - shift.x;
        const Y = mainPin.offsetTop - shift.y;
        if (X > 0 && X < blockMapWidth - MAIN_PIN_WIDTH && Y > Y_INIT_MAP - MAIN_PIN_HEIGTH && Y < Y_HEIGTH_MAP) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
          window.form.setMoveAddressFieldAd();
        }
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.form.setMoveAddressFieldAd();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }
  };

  mainPin.addEventListener('mousedown', moveMainPin);

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
