'use strict';

(function () {
  var filtersBlock = document.querySelector('.map__filters');
  var filterType = filtersBlock.querySelector('#housing-type');
  var filterPrice = filtersBlock.querySelector('#housing-price');
  var filterRooms = filtersBlock.querySelector('#housing-rooms');
  var filterGuestsNumber = filtersBlock.querySelector('#housing-guests');
  var selectFilters = filtersBlock.querySelectorAll('.map__filter');
  var inputFilters = filtersBlock.querySelectorAll('.map__filter-set input');

  var any = 'any';
  var low = 'low';
  var high = 'high';
  var middle = 'middle';

  var getCurrentFilterValue = function (filter, value) {
    filter = value;
    window.debounce(updateOffers);
  };

  selectFilters.forEach(function (elem) {
    elem.addEventListener('change', function (evt) {
      getCurrentFilterValue(elem.value, evt.target.value);
    });
  });

  inputFilters.forEach(function (elem) {
    elem.addEventListener('change', function () {
      getCurrentFilterValue(elem, elem.checked);
    });
  });

  var filterAds = function (ad) {
    var adOffer = ad.offer;
    var adFeatures = adOffer.features;
    var adPrice = adOffer.price;

    for (var i = 0; i < selectFilters.length; i++) {
      if (selectFilters[i] === filterType) {
        if (selectFilters[i].value !== any && adOffer.type !== selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === filterPrice) {
        if (selectFilters[i].value !== any &&
          (selectFilters[i].value === low && adPrice >= window.utils.PRICE_LOW
          || selectFilters[i].value === middle && (adPrice <= window.utils.PRICE_LOW || adPrice >= window.utils.PRICE_MIDDLE)
          || selectFilters[i].value === high && adPrice <= window.utils.PRICE_MIDDLE)
        ) {
          return false;
        }
      }
      if (selectFilters[i] === filterRooms || selectFilters[i] === filterGuestsNumber) {
        if (selectFilters[i].value !== any && adOffer.guests !== selectFilters[i].value * 1) {
          return false;
        }
      }
    }

    for (var j = 0; j < inputFilters.length; j++) {
      if (inputFilters[j].checked === true && adFeatures.indexOf(inputFilters[j].value) === -1) {
        return false;
      }
    }

    return true;
  };

  var updateOffers = function () {
    var filteredAds = window.backend.data.filter(filterAds);
    window.pin.removePins();
    window.showcard.removeCards();
    window.pin.renderPins(filteredAds, window.utils.pinContainer);
    window.showcard.createOffers(filteredAds);
  };

  window.filter = {
    updateOffers: updateOffers
  };

})();
