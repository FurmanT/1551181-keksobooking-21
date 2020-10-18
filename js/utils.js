'use strict';
(function () {
  const getDescTypeHousing = function (type) {
    switch (type) {
      case "flat":
        return "Квартира";
      case "bungalow":
        return "Бунгало";
      case "house":
        return "Дом";
      case "palace":
        return "Дворец";
      default: return "";
    }
  };

  const getPriceTypeHousing = function (type) {
    switch (type) {
      case "bungalow":
        return "0";
      case "flat":
        return "1 000";
      case "house":
        return "5 000";
      case "palace":
        return "10 000";
      default: return "";
    }
  };

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

  window.utils = {
    getPriceTypeHousing: getPriceTypeHousing,
    getDescTypeHousing: getDescTypeHousing,
    getRandomBetween: getRandomBetween,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
  };
})();


