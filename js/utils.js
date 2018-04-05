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
    },

    enableDragging: function (handlerElem, dragElem, extraLimits, callback) {
      dragElem = dragElem || handlerElem;

      var noLimits = {
        x: {
          left: 0,
          right: 0
        },
        y: {
          top: 0,
          bottom: 0
        }
      };
      var limits = Object.assign(noLimits, extraLimits);

      handlerElem.addEventListener('mousedown', function (event) {
        event.preventDefault();

        var clickInsideElemOffset = {
          x: event.clientX - dragElem.offsetLeft,
          y: event.clientY - dragElem.offsetTop
        };

        var dragElemHalfWidth = dragElem.offsetWidth / 2;
        var dragElemHalfHeight = dragElem.offsetHeight / 2;

        var minCoords = {
          x: dragElemHalfWidth + limits.x.left,
          y: dragElemHalfHeight + limits.y.top
        };

        var maxCoords = {
          x: dragElem.parentNode.offsetWidth - dragElemHalfWidth - limits.x.right,
          y: dragElem.parentNode.offsetHeight - dragElemHalfHeight - limits.y.bottom
        };

        var onElemHandlerMouseMove = function (moveEvent) {

          var moveCoords = {
            x: moveEvent.clientX - clickInsideElemOffset.x,
            y: moveEvent.clientY - clickInsideElemOffset.y
          };

          var movedElemNewPosition = {
            x: Math.max(minCoords.x, Math.min(moveCoords.x, maxCoords.x)),
            y: Math.max(minCoords.y, Math.min(moveCoords.y, maxCoords.y))
          };

          dragElem.style.left = movedElemNewPosition.x + 'px';
          dragElem.style.top = movedElemNewPosition.y + 'px';

          if (typeof callback === 'function') {
            callback();
          }
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onElemHandlerMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onElemHandlerMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },
  };
})();
