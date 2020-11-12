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
let filters = {};

const setInitPointMainPin = () => {
  mainPin.style.left = xInitialMainPin;
  mainPin.style.top = yInitialMainPin;
};

const pinCheck = (pin, filterType, filterValue) => {
  const elementFeatures = elementFieldSet.querySelectorAll("input[name='features']:checked");

  switch (filterType) {
    case `housing-type`:
      if (filterValue && filterValue !== ANY_ITEM) {
        return pin.offer.type === filterValue;
      }
      break;
    case `housing-price`:
      if (filterValue && filterValue !== ANY_ITEM) {
        if (filterValue === `middle`) {
          return parseInt(pin.offer.price, 10) > MIN_PRICE && parseInt(pin.offer.price, 10) < MAX_PRICE;
        }
        if (filterValue === `low`) {
          return parseInt(pin.offer.price, 10) < MIN_PRICE;
        }
        if (filterValue === `high`) {
          return parseInt(pin.offer.price, 10) > MAX_PRICE;
        }
        return true;
      }
      break;
    case `housing-rooms`:
      if (filterValue && filterValue !== ANY_ITEM) {
        return pin.offer.rooms === parseInt(filterValue, 10);
      }
      break;
    case `housing-guests`:
      if (filterValue && filterValue !== ANY_ITEM) {
        return pin.offer.guests === parseInt(filterValue, 10);
      }
      break;
    case `features`:
      if (elementFeatures && elementFeatures.length !== 0) {
        return Array.from(elementFeatures).every((element) => {
          return pin.offer.features.indexOf(element.value) !== -1;
        });
      }
      break;
  }
  return true;
};

const onFilterFormChange = (evt) => {
  filters[evt.target.name] = evt.target.value;
  filterArray = [];
  for (let i = 0; i < allPins.length; i++) {
    if (filterArray.length < 5) {
      let result = Object.entries(filters).every(([key, value]) => pinCheck(allPins[i], key, value));
      if (result === true) {
        filterArray.push(allPins[i]);
      }
    } else {
      break;
    }
  }
  window.debounce(createPin);
};

const onSuccessGetData = (data) => {
  allPins = data;
  filterArray = data;
  createPin();
};

const onMapListElementClick = (evt) => {
  deleteActiveClassPin();
  let dataId;
  if (evt.target.tagName === "BUTTON") {
    dataId = evt.target.getAttribute("data-id");
    evt.target.classList.add("map__pin--active");
  }
  if (evt.target.tagName === "IMG" && evt.target.parentElement.tagName === "BUTTON") {
    dataId = evt.target.parentElement.getAttribute("data-id");
    evt.target.parentElement.classList.add("map__pin--active");
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

const createPin = () => {
  mapListElement.removeEventListener("click", onMapListElementClick);
  window.card.remove();
  const currentPinElement = mapListElement.querySelectorAll(".map__pin");
  currentPinElement.forEach((item, key) => {
    if (key !== 0) {
      item.remove();
    }
  });
  mapListElement.appendChild(window.pin.render(filterArray));
  mapListElement.addEventListener("click", onMapListElementClick);
};

const deletePin = () => {
  window.card.remove();
  const currentPinElement = mapListElement.querySelectorAll(".map__pin");
  currentPinElement.forEach((item, key) => {
    if (key !== 0) {
      item.remove();
    }
  });
};

const setActive = () => {
  blockMap.classList.remove("map--faded");
  try {
    window.server.loadData(onSuccessGetData, window.utils.showErrorOnBody);
    filterForm.addEventListener('change', onFilterFormChange);
  } catch (error) {
    window.utils.showErrorOnBody(`Ошибка при получении данных: ${error.message}`);
  }
};

const setDisable = () => {
  blockMap.classList.add("map--faded");
};

const onElementClosePopupClick = (evt) => {
  evt.preventDefault();
  closeCard();
};

const onDocumentKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCard();
  }
};

const closeCard = () => {
  deleteActiveClassPin();
  window.card.remove();
  document.removeEventListener('keydown', onElementClosePopupClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const deleteActiveClassPin = () => {
  const activePin = mapListElement.querySelector(".map__pin--active");
  if (activePin) {
    activePin.classList.remove("map__pin--active");
  }
};


const onMainPinMouseDown = (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();
    if (blockMap.classList.contains("map--faded")) {
      window.page.setActiveState();
    }

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onDocumentMouseMove = (moveEvt) => {
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

    const onDocumentMouseUp = (upEvt) => {
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

mainPin.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    if (blockMap.classList.contains("map--faded")) {
      window.page.setActiveState();
    }
  }
});

window.map = {
  getSizeMainPin: () => {
    return {
      width: MAIN_PIN_WIDTH,
      heigth: MAIN_PIN_HEIGTH
    };
  },
  setInitPointMainPin,
  setActive,
  setDisable,
  deletePin,
};
