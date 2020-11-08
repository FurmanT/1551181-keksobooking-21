'use strict';
const Y_INIT_MAP = 130;
const Y_HEIGTH_MAP = 630;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGTH = 65;
const ANY_ITEM = "any";
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const blockMap = document.querySelector(".map");
const mapListElement = blockMap.querySelector(`.map__pins`);
const mainPin = mapListElement.querySelector('.map__pin--main');
const xInitialMainPin = mainPin.style.left;
const yInitialMainPin = mainPin.style.top;
let allPins = [];
const filterForm = blockMap.querySelector('.map__filters');
let filterArray = [];
const elementFieldSet = filterForm.querySelector("fieldset");
const elementFeatures = elementFieldSet.querySelectorAll(".map__checkbox");

const setInitPointMainPin = function () {
  mainPin.style.left = xInitialMainPin;
  mainPin.style.top = yInitialMainPin;
};

const onFilterFormChange = function (evt) {
  let filter = allPins;
  let features = [];
  elementFeatures.forEach(function (el) {
    if (el.checked) {
      features.push(el.value);
    }
  });

  switch (evt.target.name) {
    case "housing-type":
      if (evt.target.value && evt.target.value !== ANY_ITEM) {
        filter = filter.filter(function (pin) {
          return pin.offer.type === evt.target.value;
        });
      }
      break;
    case "housing-price":
      if (evt.target.value && evt.target.value !== ANY_ITEM) {
        filter = filter.filter(function (pin) {
          if (evt.target.value === "middle") {
            return parseInt(pin.offer.price, 10) > MIN_PRICE && parseInt(pin.offer.price, 10) < MAX_PRICE;
          }
          if (evt.target.value === "low") {
            return parseInt(pin.offer.price, 10) < MIN_PRICE;
          }
          if (evt.target.value === "high") {
            return parseInt(pin.offer.price, 10) > MIN_PRICE;
          }
          return true;
        });
      }
      break;
    case "housing-rooms":
      if (evt.target.value && evt.target.value !== ANY_ITEM) {
        filter = filter.filter(function (pin) {
          return pin.offer.rooms === parseInt(evt.target.value, 10);
        });
      }
      break;
    case "housing-guests":
      if (evt.target.value && evt.target.value !== ANY_ITEM) {
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
  window.debounce(createPin);
};

const onSuccessGetData = function (data) {
  allPins = data;
  filterArray = data;
  createPin();
};

const onMapListElementClick = function (evt) {
  let dataId;
  if (evt.target.tagName === "BUTTON") {
    dataId = evt.target.getAttribute("data-id");
    evt.target.classList.add("map__pin--active");
  }
  if (evt.target.tagName === "IMG" && evt.path[1].tagName === "BUTTON") {
    dataId = evt.path[1].getAttribute("data-id");
    evt.path[1].classList.add("map__pin--active");
  }
  if (dataId) {
    const elementCard = mapListElement.querySelector(".map__card");
    if (elementCard) {
      elementCard.remove();
    }
    mapListElement.appendChild(window.card.create(filterArray[dataId]));
    const elementClosePopup = mapListElement.querySelector(".popup__close");
    elementClosePopup.addEventListener('click', onElementClosePopupClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  }
};

const createPin = function () {
  mapListElement.removeEventListener("click", onMapListElementClick);
  window.card.remove();
  const currentPinElement = mapListElement.querySelectorAll(".map__pin");
  currentPinElement.forEach(function (item, key) {
    if (key !== 0) {
      item.remove();
    }
  });
  mapListElement.appendChild(window.pin.render(filterArray));
  mapListElement.addEventListener("click", onMapListElementClick);
};

const deletePin = function () {
  window.card.remove();
  const currentPinElement = mapListElement.querySelectorAll(".map__pin");
  currentPinElement.forEach(function (item, key) {
    if (key !== 0) {
      item.remove();
    }
  });
};

const setActive = function () {
  blockMap.classList.remove("map--faded");
  try {
    window.server.loadData(onSuccessGetData, window.utils.showErrorOnBody);
    filterForm.addEventListener('change', onFilterFormChange);
  } catch (error) {
    window.utils.showErrorOnBody(`Ошибка при получении данных: ${error.message}`);
  }
};

const setDisable = function () {
  blockMap.classList.add("map--faded");
};

const onElementClosePopupClick = function (evt) {
  evt.preventDefault();
  closeCard();
};

const onDocumentKeyDown = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCard();
  }
};

const closeCard = function () {
  window.card.remove();
  const activePin = mapListElement.querySelector(".map__pin--active");
  activePin.classList.remove("map__pin--active");
  document.removeEventListener('keydown', onElementClosePopupClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const fnActiveState = window.page.setActiveState();

const onMainPinMouseDown = function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    fnActiveState();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onDocumentMouseMove = function (moveEvt) {
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
      const x = mainPin.offsetLeft - shift.x;
      const y = mainPin.offsetTop - shift.y;
      if (x > 0 - MAIN_PIN_WIDTH / 2 && x < blockMapWidth - MAIN_PIN_WIDTH / 2 &&
        y > Y_INIT_MAP - MAIN_PIN_HEIGTH &&
        y < Y_HEIGTH_MAP - MAIN_PIN_HEIGTH) {

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        window.form.setMoveAddressFieldAd();
      }
    };

    const onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setMoveAddressFieldAd();
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);

  }
};

mainPin.addEventListener('mousedown', onMainPinMouseDown);

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
  setInitPointMainPin: setInitPointMainPin,
  setActive: setActive,
  setDisable: setDisable,
  deletePin: deletePin,
};
