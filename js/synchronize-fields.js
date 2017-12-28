'use strict';

(function () {
  window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, callback) {
    var numElem = firstFieldValues.indexOf(firstField.value);
    var dependValue = secondFieldValues[numElem];
    if (typeof callback === 'function') {
      callback(secondField, dependValue);
    }
  };
})();
