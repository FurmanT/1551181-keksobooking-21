'use strict';
const getDescTypeHousing = (type) => {
  switch (type) {
    case "flat":
      return "Квартира";
    case "bungalow":
      return "Бунгало";
    case "house":
      return "Дом";
    case "palace":
      return "Дворец";
    default:
      return "";
  }
};

const getPriceTypeHousing = (type) => {
  switch (type) {
    case "bungalow":
      return "0";
    case "flat":
      return "1 000";
    case "house":
      return "5 000";
    case "palace":
      return "10 000";
    default:
      return "";
  }
};

const getRandomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomArray = (array) => {
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

const showErrorOnBody = (error) => {
  const node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';
  node.textContent = error;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.utils = {
  getPriceTypeHousing: getPriceTypeHousing,
  getDescTypeHousing: getDescTypeHousing,
  getRandomBetween: getRandomBetween,
  getRandomNumber: getRandomNumber,
  getRandomArray: getRandomArray,
  showErrorOnBody: showErrorOnBody,
};


