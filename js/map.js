'use strict';

(function () {
  var pinContainer = window.utils.pinContainer;
  var mainPin = window.utils.mainPin;
  var data = [];

  var PIN_LIMITS = {
    x: {
      left: mainPin.offsetWidth,
      right: mainPin.offsetWidth
    },
    y: {
      top: 100 + mainPin.offsetHeight,
      bottom: pinContainer.offsetHeight - mainPin.offsetHeight * 2 - 500
    }
  };

  var successHandler = function (array) {
    data = array;
    window.map = {
      data: data
    };

  };

  var mainPinClickHandler = function (evt) {
    window.form.setPinLocation();
    if (mainPin === document.activeElement && evt.keyCode === window.utils.ENTER_KEYCODE || evt.type === 'mouseup') {
      window.filter.updateOffers();
      window.utils.map.classList.remove('map--faded');
      window.utils.form.classList.remove('notice__form--disabled');
      window.form.enableFieldsets();
    }
  };

  var removeActivePin = function () {
    var activePin = window.utils.map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var hideOffer = function () {
    var offerCards = window.utils.map.querySelectorAll('.popup');
    offerCards.forEach(function (elem) {
      if (elem.classList.contains('.hidden') !== true) {
        elem.classList.add('hidden');
      }
    });
  };

  var pinContainerClickHandler = function (evt) {
    var allPins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    var offerCards = window.utils.map.querySelectorAll('.popup');
    allPins.forEach(function (elem, i) {
      if (evt.target.parentElement === elem || elem === document.activeElement) {
        removeActivePin();
        hideOffer();
        elem.classList.add('map__pin--active');
        offerCards[i].classList.remove('hidden');
        window.utils.map.addEventListener('click', closeOffer);
        document.addEventListener('keydown', closeOffer);
      }
    });

  };

  var closeOffer = function (evt) {
    if (evt.type === 'keydown' && evt.keyCode === window.utils.ESC_KEYCODE || evt.type === 'click' && evt.target.classList.contains('popup__close')) {
      removeActivePin();
      hideOffer();
      window.utils.map.removeEventListener('click', closeOffer);
      document.removeEventListener('keydown', closeOffer);
    }
  };

  window.utils.enableDragging(mainPin, mainPin, PIN_LIMITS, window.form.setPinLocation);
  window.backend.load(successHandler, window.backend.errorHandler);
  mainPin.addEventListener('mouseup', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinClickHandler);
  pinContainer.addEventListener('click', pinContainerClickHandler);
})();
