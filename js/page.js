'use strict';

const setDisabledState = function () {
  window.form.setInitDisable();
  window.form.setInitAddressFieldAd();
  window.map.setDisable();
};

const setActiveState = function () {
  let active = false;
  return function () {
    if (!active) {
      window.form.setActive();
      window.map.setActive();
      active = true;
    }
  };
};

window.page = {
  setDisabledState: setDisabledState,
  setActiveState: setActiveState,
};

