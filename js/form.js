'use strict';

(function () {
  var form = window.utils.form;
  var formFieldsets = form.querySelectorAll('fieldset');
  var submitBtn = form.querySelector('.form__submit');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var enableFieldsets = function () {
    formFieldsets.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var timeInSelectHandler = function () {
    window.synchronizeFields(timeIn, timeOut, window.utils.CHECK_TIMES, window.utils.CHECK_TIMES, syncValues);
  };

  var timeOutSelectHandler = function () {
    window.synchronizeFields(timeOut, timeIn, window.utils.CHECK_TIMES, window.utils.CHECK_TIMES, syncValues);
  };

  function disableFieldsets() {
    formFieldsets.forEach(function (elem) {
      elem.setAttribute('disabled', true);
    });
  }

  var typeSelectHandler = function () {
    var offerTypePrice = {
      'flat': 1000,
      'bungalo': 0,
      'house': 5000,
      'palace': 10000
    };

    window.synchronizeFields(type, price, Object.keys(offerTypePrice), Object.values(offerTypePrice), syncValueWithMin);
  };

  var roomNumberSelectHandler = function () {
    var RoomCapacity = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };
    var capacityOptions = capacity.querySelectorAll('option');
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    RoomCapacity[roomNumber.value].forEach(function (it) {
      capacity.querySelector('option' + '[value="' + it + '"]').disabled = false;
      capacity.value = it;
    });
  };

  var checkErorrs = function () {
    var inputs = window.utils.form.querySelectorAll('input');
    inputs.forEach(function (elem) {
      if (elem.checkValidity() === false) {
        elem.classList.add('validation-error');
      } else {
        elem.classList.remove('validation-error');
      }
    });
  };

  var setPinLocation = function () {
    var mainPin = window.utils.mainPin;
    var coordX = mainPin.offsetLeft;
    var coordY = mainPin.offsetTop;
    var adress = window.utils.form.querySelector('#address');
    adress.value = 'x: ' + coordX + ', y: ' + coordY;
  };

  var formSucessHandler = function () {
    var node = document.createElement('div');
    node.classList.add('success-message');
    node.textContent = 'Данные отправлены успешно';
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      document.body.removeChild(node);
    }, 3000);
  };

  disableFieldsets();
  typeSelectHandler();
  roomNumberSelectHandler();
  timeIn.addEventListener('change', timeInSelectHandler);
  timeOut.addEventListener('change', timeOutSelectHandler);
  type.addEventListener('change', typeSelectHandler);
  roomNumber.addEventListener('change', roomNumberSelectHandler);
  submitBtn.addEventListener('click', checkErorrs);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      form.reset();
      setPinLocation();
      formSucessHandler();
    }, window.backend.errorHandler);
    evt.preventDefault();
  });

  window.form = {
    setPinLocation: setPinLocation,
    enableFieldsets: enableFieldsets
  };
})();
