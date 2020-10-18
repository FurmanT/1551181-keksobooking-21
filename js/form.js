'use strict';
(function () {
  const adForm = document.querySelector('.ad-form');
  const elementFieldsetsAdForm = adForm.querySelectorAll("fieldset");
  const filterForm = document.querySelector('.map__filters');
  const elementSelectsFilterForm = filterForm.querySelectorAll("select");
  const fieldsetFilterForm = filterForm.querySelectorAll("fieldset");
  const addressField = adForm.querySelector("#address");
  const fieldRoom = adForm.querySelector('#room_number');
  const fieldCapacity = adForm.querySelector('#capacity');
  const blockMap = document.querySelector(".map");
  const mapListElement = blockMap.querySelector(`.map__pins`);
  const mainPin = mapListElement.querySelector('.map__pin--main');
  const elemetTimeIn = document.getElementById("timein");
  const elemetTimeOut = document.getElementById("timeout");
  const elementType = document.getElementById("type");
  const elementPrice = document.getElementById("price");
  const MAIN_PIN_WIDTH = window.map.getSizeMainPin().width;
  const MAIN_PIN_HEIGTH = window.map.getSizeMainPin().heigth;

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

  const setDisable = function () {
    elementFieldsetsAdForm.forEach(function (element) {
      element.disabled = true;
    });
    elementSelectsFilterForm.forEach(function (element) {
      element.disabled = true;
    });
    fieldsetFilterForm.disabled = true;
  };

  const setActive = function () {
    adForm.classList.remove("ad-form--disabled");
    elementFieldsetsAdForm.forEach(function (element) {
      element.disabled = false;
    });
    elementSelectsFilterForm.forEach(function (element) {
      element.disabled = false;
    });
    fieldsetFilterForm.disabled = false;
    elemetTimeIn.addEventListener("change", function () {
      elemetTimeOut.value = elemetTimeIn.value;
    });
    elemetTimeOut.addEventListener("change", function () {
      elemetTimeIn.value = elemetTimeOut.value;
    });
    elementType.addEventListener("change", function () {
      let price = window.utils.getPriceTypeHousing(elementType.value);
      elementPrice.setAttribute("minlength", price);
      elementPrice.setAttribute("placeholder", price);
    });
    fieldRoom.addEventListener("change", function () {
      if (fieldCapacity.value !== fieldRoom.value) {
        fieldRoom.setCustomValidity("Укажите соответствующее количество");
      } else {
        fieldRoom.setCustomValidity("");
      }
      fieldRoom.reportValidity();
    });
  };

  window.form = {
    setDisable: setDisable,
    setActive: setActive,
    setInitAddressFieldAd: setInitAddressFieldAd,
    setMoveAddressFieldAd: setMoveAddressFieldAd,
  };
})();
