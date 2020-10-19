'use strict';
(function () {
  const setDisabledState = function () {
    window.form.setDisable();
    window.form.setInitAddressFieldAd();
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

})();

