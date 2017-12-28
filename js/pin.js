'use strict';

(function () {

  var createPin = function (similarItem, pinWidth, pinHeight, imageWidth, imageHeight) {
    var pin = document.createElement('button');
    pin.classList.add('map__pin');
    pin.style.left = similarItem.location.x - pinWidth / 2 + 'px';
    pin.style.top = similarItem.location.y + pinHeight + 'px';

    var image = document.createElement('img');
    image.className = 'rounded';
    image.src = similarItem.author.avatar;
    image.width = imageWidth;
    image.height = imageHeight;
    image.setAttribute('draggable', false);

    pin.appendChild(image);

    return pin;
  };

  var renderPins = function (array, element) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      if (array.length > window.utils.MAX_ADS_COUNT) {
        array.length = window.utils.MAX_ADS_COUNT;
      }
      fragment.appendChild(createPin(array[i], window.utils.PIN_WIDTH, window.utils.PIN_HEIGHT, window.utils.IMAGE_WIDTH, window.utils.IMAGE_HEIGHT));
    }
    element.appendChild(fragment);
  };

  var removePins = function () {
    var pins = window.utils.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (elem) {
      elem.remove();
    });
  };


  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
