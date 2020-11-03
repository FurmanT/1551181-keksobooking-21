'use strict';

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGTH = 65;
const blockMap = document.querySelector(".map");
const mapListElement = blockMap.querySelector(`.map__pins`);
const mainPin = mapListElement.querySelector('.map__pin--main');
const Y_INIT_MAP = 130;
const Y_HEIGTH_MAP = 630;
let allPins = [];
const filterForm = blockMap.querySelector('.map__filters');
let filterArray = [];
const elementFieldSet = filterForm.querySelector("fieldset");
const elementFeatures = elementFieldSet.querySelectorAll(".map__checkbox");

const filterChangeHandler = function (evt) {
  let filter = allPins;
  let features = [];
  elementFeatures.forEach(function (el) {
    if (el.checked) {
      features.push(el.value);
    }
  });

  switch (evt.target.name) {
    case "housing-type":
      if (evt.target.value && evt.target.value !== "any") {
        filter = filter.filter(function (pin) {
          return pin.offer.type === evt.target.value;
        });
      }
      break;
    case "housing-price":
      if (evt.target.value && evt.target.value !== "any") {
        filter = filter.filter(function (pin) {
          if (evt.target.value === "middle") {
            return parseInt(pin.offer.price, 10) > 10000 && parseInt(pin.offer.price, 10) < 50000;
          }
          if (evt.target.value === "low") {
            return parseInt(pin.offer.price, 10) < 10000;
          }
          if (evt.target.value === "high") {
            return parseInt(pin.offer.price, 10) > 10000;
          }
          return true;
        });
      }
      break;
    case "housing-rooms":
      if (evt.target.value && evt.target.value !== "any") {
        filter = filter.filter(function (pin) {
          return pin.offer.rooms === parseInt(evt.target.value, 10);
        });
      }
      break;
    case "housing-guests":
      if (evt.target.value && evt.target.value !== "any") {
        filter = filter.filter(function (pin) {
          return pin.offer.guests === parseInt(evt.target.value, 10);
        });
      }
      break;
    case "features":
      if (features.length !== 0) {
        filter = filter.filter(function (pin) {
          return features.every(function (element) {
            return pin.offer.features.indexOf(element) !== -1;
          });
        });
      }
      break;
  }
  filterArray = filter;
  window.debounce(createPinOnMap);
};


const onSuccessGetData = function (data) {
  allPins = data;
  filterArray = data;
  createPinOnMap();
};

const eventShowPin = function (evt) {
  let dataId = evt.target.getAttribute("data-id");
  if (evt.target.tagName === "IMG" && dataId) {
    const elementCard = mapListElement.querySelector(".map__card");
    if (!elementCard) {
      mapListElement.appendChild(window.card.create(filterArray[dataId]));
      const elementClosePopup = mapListElement.querySelector(".popup__close");
      elementClosePopup.addEventListener('click', deleteEventCard);
    }
  }
};

const createPinOnMap = function () {
  mapListElement.removeEventListener("click", eventShowPin);
  window.card.deleteCard();
  const currentPinElement = mapListElement.querySelectorAll(".map__pin");
  currentPinElement.forEach(function (item, key) {
    if (key !== 0) {
      item.remove();
    }
  });
  mapListElement.appendChild(window.pin.render(filterArray));
  mapListElement.addEventListener("click", eventShowPin);
};

const setActiveMap = function () {
  blockMap.classList.remove("map--faded");
  try {
    window.server.loadData(onSuccessGetData, window.utils.showErrorOnBody);
    filterForm.addEventListener('change', filterChangeHandler);
  } catch (error) {
    window.utils.showErrorOnBody(`Ошибка при получении данных: ${error.message}`);
  }
};

const deleteEventCard = function (evt) {
  evt.preventDefault();
  window.card.deleteCard();
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

