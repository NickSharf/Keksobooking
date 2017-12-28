'use strict';

(function () {

  window.utils = {
    PIN_WIDTH: 46,
    PIN_HEIGHT: 46,
    IMAGE_WIDTH: 40,
    IMAGE_HEIGHT: 40,
    MAIN_PIN_HEIGHT: 78,
    MAIN_PIN_WIDTH: 65,
    MAX_ADS_COUNT: 5,
    CHECK_TIMES: ['12:00', '13:00', '14:00'],
    PRICE_LOW: 10000,
    PRICE_MIDDLE: 50000,
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    form: document.querySelector('.notice__form'),
    map: document.querySelector('.map'),
    pinContainer: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main'),

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();
