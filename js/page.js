'use strict';

const setDisabledState = () => {
  window.form.setInitDisable();
  window.form.setInitAddressFieldAd();
  window.map.setDisable();
};

const setActiveState = () => {
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

