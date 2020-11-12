'use strict';

const setDisabledState = () => {
  window.form.setInitDisable();
  window.form.setInitAddressFieldAd();
  window.map.setDisable();
};

const setActiveState = () => {
  window.form.setActive();
  window.map.setActive();
};

window.page = {
  setDisabledState,
  setActiveState,
};

