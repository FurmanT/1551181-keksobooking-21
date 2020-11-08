'use strict';
const MAIN_PIN_WIDTH = window.map.getSizeMainPin().width;
const MAIN_PIN_HEIGTH = window.map.getSizeMainPin().heigth;
const adForm = document.querySelector('.ad-form');
const elementFieldsetsAdForm = adForm.querySelectorAll("fieldset");
const filterForm = document.querySelector('.map__filters');
const elementSelectsFilterForm = filterForm.querySelectorAll("select");
const fieldsetFilterForm = filterForm.querySelector("fieldset");
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
const elementMain = document.getElementsByTagName('main')[0];
const avatarFile = adForm.querySelector('.ad-form__field input[type=file]');
const previewAvatarFile = adForm.querySelector('.ad-form-header__preview img');
const photoHousingFile = adForm.querySelector('.ad-form__upload input[type=file]');
const previewHousingFile = adForm.querySelector('.ad-form__photo');
const defaultAvatarPath = previewAvatarFile.src;
const elementResetForm = adForm.querySelector(".ad-form__reset");

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

const setInitDisable = function () {
  elementFieldsetsAdForm.forEach(function (element) {
    element.disabled = true;
  });
  elementSelectsFilterForm.forEach(function (element) {
    element.disabled = true;
  });
  fieldsetFilterForm.disabled = true;
  adForm.classList.add("ad-form--disabled");
};

const setFullDisable = function () {
  window.page.setDisabledState();
  adForm.reset();
  filterForm.reset();
  resetFiles();
  window.map.setInitPointMainPin();
  setInitAddressFieldAd();
  window.map.deletePinFromMap();
};

const resetFiles = function () {
  previewAvatarFile.src = defaultAvatarPath;
  const imgPreviewHousingFile = previewHousingFile.querySelector("img");
  if (imgPreviewHousingFile) {
    imgPreviewHousingFile.remove();
  }
};

const onElementPriceChange = function (evt) {
  const value = evt.target.value.replace(/\s/g, '');
  const min = evt.target.getAttribute("minlength").replace(/\s/g, '');
  const max = evt.target.getAttribute("maxlength").replace(/\s/g, '');
  if (parseInt(value, 10) < parseInt(min, 10) || parseInt(value, 10) > parseInt(max, 10)) {
    elementPrice.setCustomValidity("Укажите соответствующее количество");
  } else {
    elementPrice.setCustomValidity("");
  }
  elementPrice.reportValidity();
};

const checkRooms = function () {
  switch (fieldRoom.value) {
    case "1":
      if (fieldCapacity.value === "1") {
        fieldCapacity.setCustomValidity("");
      } else {
        fieldCapacity.setCustomValidity("Укажите соответствующее количество");
      }
      break;
    case "2":
      if (["1", "2"].indexOf(fieldCapacity.value) !== -1) {
        fieldCapacity.setCustomValidity("");
      } else {
        fieldCapacity.setCustomValidity("Укажите соответствующее количество");
      }
      break;
    case "3":
      if (["1", "2", "3"].indexOf(fieldCapacity.value) !== -1) {
        fieldCapacity.setCustomValidity("");
      } else {
        fieldCapacity.setCustomValidity("Укажите соответствующее количество");
      }
      break;
    case "100":
      if (fieldCapacity.value === "0") {
        fieldCapacity.setCustomValidity("");
      } else {
        fieldCapacity.setCustomValidity("Укажите соответствующее количество");
      }
      break;
  }
  fieldCapacity.reportValidity();
};

const setMinLengthPrice = function () {
  const price = window.utils.getPriceTypeHousing(elementType.value);
  elementPrice.setAttribute("minlength", price);
  elementPrice.setAttribute("placeholder", price);
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
    setMinLengthPrice();
  });

  elementPrice.addEventListener("change", onElementPriceChange);
  fieldCapacity.addEventListener("change", function () {
    checkRooms();
  });
  fieldRoom.addEventListener("change", function () {
    checkRooms();
  });
  fieldCapacity.value = fieldRoom.value;
  window.file.addPreview(avatarFile, previewAvatarFile);
  window.file.addPreview(photoHousingFile, previewHousingFile);
  elementResetForm.addEventListener("click", function () {
    setFullDisable();
  });
  setMinLengthPrice();
};

const onDocumentClick = function (evt) {
  evt.preventDefault();
  const elementError = elementMain.querySelector(".error");
  elementError.remove();
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentClick);
};

const onErrorAdFormSubmit = function (text) {
  const elementError = window.resultSend.showError(text);
  elementMain.append(elementError);
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocumentClick);
};

const deleteElementSuccess = function (evt) {
  evt.preventDefault();
  const elementSuccess = elementMain.querySelector(".success");
  elementSuccess.remove();
  document.removeEventListener('click', deleteElementSuccess);
  document.removeEventListener('keydown', deleteElementSuccess);
};

const onSuccessAdFormSubmit = function () {
  elementMain.append(window.resultSend.showSuccess());
  document.addEventListener("click", deleteElementSuccess);
  document.addEventListener("keydown", deleteElementSuccess);
  setFullDisable();
};

const onAdFormSubmit = function (evt) {
  evt.preventDefault();
  try {
    window.server.uploadData(new FormData(adForm), onSuccessAdFormSubmit, onErrorAdFormSubmit);
  } catch (error) {
    onErrorAdFormSubmit(`Ошибка: ${error.message}`);
  }
};

adForm.addEventListener('submit', onAdFormSubmit);

window.form = {
  setInitDisable: setInitDisable,
  setActive: setActive,
  setInitAddressFieldAd: setInitAddressFieldAd,
  setMoveAddressFieldAd: setMoveAddressFieldAd,
};
