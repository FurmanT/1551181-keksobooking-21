'use strict';

(function () {
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
  const blockMap = document.querySelector(".map");

  const createArrayAdvertising = function () {
    let array = [];
    for (let i = 1; i <= COUNT; i++) {
      array.push(
          {
            "author": {
              "avatar": `img/avatars/user0${i}.png`
            },
            "offer": {
              "title": "Самое лучшее жилье в твоей жизни",
              "address": "600, 350",
              "price": 50,
              "type": TYPE[window.utils.getRandomNumber(TYPE.length)],
              "rooms": 5,
              "guests": 5,
              "checkin": CHECK_TIME[window.utils.getRandomNumber(CHECK_TIME.length)],
              "checkout": CHECK_TIME[window.utils.getRandomNumber(CHECK_TIME.length)],
              "features": window.utils.getRandomArray(FEATURES),
              "description": "Описание",
              "photos": window.utils.getRandomArray(IMAGES),
            },
            "location": {
              "x": window.utils.getRandomBetween(0, blockMap.offsetWidth),
              "y": window.utils.getRandomBetween(Y_INIT, Y_HEIGTH),
            }
          });
    }
    return array;
  };

  window.data = {
    createArrayAdvertising: createArrayAdvertising,
  };
})();


