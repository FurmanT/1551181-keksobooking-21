'use strict';
const COUNT = 8;
const TYPE = ["palace", "flat", "house", "bungalow"];
const CHECK_TIME = ["12:00", "13:00", "14:00"];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const IMAGES = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];
const Y_INIT = 130;
const Y_HEIGTH = 630;
const WIDTH = 50;
const HEIGTH = 70;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGTH = 65;
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const elementFieldsetsAdForm = adForm.querySelectorAll("fieldset");
const elementSelectsFilterForm = filterForm.querySelectorAll("select");
const fieldsetFilterForm = filterForm.querySelectorAll("fieldset");
const blockMap = document.querySelector(".map");
const addressField = adForm.querySelector("#address");
const fieldRoom = adForm.querySelector('#room_number');
const fieldCapacity = adForm.querySelector('#capacity');
const mapListElement = blockMap.querySelector(`.map__pins`);
const mainPin = mapListElement.querySelector('.map__pin--main');

const getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

const getRandomArray = function (array) {
  let count = getRandomBetween(1, array.length);
  let newArray = [];
  for (let i = 0; i < count; i++) {
    let result = false;
    do {
      let index = getRandomBetween(0, array.length - 1);
      if (newArray.indexOf(array[index]) === -1) {
        newArray.push(array[index]);
        result = true;
      }
    } while (result === false);
  }
  return newArray;
};

const createArrayAdvertising = function () {
  let array = [];
  for (let i = 1; i <= COUNT; i++) {
    array.push(
        {
          "author": {
            "avatar": `img/avatars/user0${i}.png`
          },
          "offer": {
            "title": "Заголовок предложения",
            "address": "600, 350",
            "price": 50,
            "type": TYPE[getRandomNumber(TYPE.length)],
            "rooms": 5,
            "guests": 5,
            "checkin": CHECK_TIME[getRandomNumber(CHECK_TIME.length)],
            "checkout": CHECK_TIME[getRandomNumber(CHECK_TIME.length)],
            "features": getRandomArray(FEATURES),
            "description": "Описание",
            "photos": getRandomArray(IMAGES),
          },
          "location": {
            "x": getRandomBetween(0, blockMap.offsetWidth),
            "y": getRandomBetween(Y_INIT, Y_HEIGTH),
          }
        });
  }
  return array;
};

const advertisingTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const renderAdvertising = function (advertising) {
  const advertisingElement = advertisingTemplate.cloneNode(true);
  const img = advertisingElement.querySelector(`img`);
  img.alt = advertising.offer.title;
  img.src = advertising.author.avatar;
  advertisingElement.style = `left: ${advertising.location.x + (WIDTH / 2)}px; top: ${advertising.location.y + HEIGTH}px;`;
  return advertisingElement;
};

const createFragment = function () {
  const fragment = document.createDocumentFragment();
  const arrayAdvertising = createArrayAdvertising();
  arrayAdvertising.forEach((item) => {
    fragment.appendChild(renderAdvertising(item));
  });
  return fragment;
};

const setActiveMap = function () {
  mapListElement.appendChild(createFragment());
};

setActiveMap();

const setMoveAddressFieldAd = function () {
  let x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
  let y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGTH;
  addressField.value = Math.floor(x) + ',' + Math.floor(y);
};

const setInitAddressFieldAd = function () {
  let x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
  let y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGTH / 2;
  addressField.value = Math.floor(x) + ',' + Math.floor(y);
};

const setDisabledState = function () {
  elementFieldsetsAdForm.forEach(function (element) {
    element.disabled = true;
  });

  elementSelectsFilterForm.forEach(function (element) {
    element.disabled = true;
  });
  fieldsetFilterForm.disabled = true;
  setInitAddressFieldAd();
};

const setActiveState = function () {
  let active = false;
  return function () {
    if (!active) {
      blockMap.classList.remove("map--faded");
      adForm.classList.remove("ad-form--disabled");
      elementFieldsetsAdForm.forEach(function (element) {
        element.disabled = false;
      });
      elementSelectsFilterForm.forEach(function (element) {
        element.disabled = false;
      });
      fieldsetFilterForm.disabled = false;
      active = true;
    }
  };
};

const fnActiveState = setActiveState();

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    setMoveAddressFieldAd();
    fnActiveState();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    fnActiveState();
  }
});

fieldRoom.addEventListener("change", function () {
  if (fieldCapacity.value !== fieldRoom.value) {
    fieldRoom.setCustomValidity("Укажите соответствующее количестве");
  } else {
    fieldRoom.setCustomValidity("");
  }
  fieldRoom.reportValidity();
});

setDisabledState();
