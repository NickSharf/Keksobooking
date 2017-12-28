'use strict';

(function () {

  var template = document.querySelector('template').content;

  var renderFeatures = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (elem) {
      var container = document.createElement('li');
      container.className = 'feature';
      container.classList.add('feature--' + elem);
      fragment.appendChild(container);
    });
    return fragment;
  };

  var createOffers = function (array) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var cardTemplate = template.querySelector('.map__card');
    for (var i = 0; i < array.length; i++) {
      if (array.length > window.utils.MAX_ADS_COUNT) {
        array.length = window.utils.MAX_ADS_COUNT;
      }
      var cardTemplateItem = cardTemplate.cloneNode(true);
      var adTitle = cardTemplateItem.querySelector('h3');
      var adAdress = cardTemplateItem.querySelector('p small');
      var adPrice = cardTemplateItem.querySelector('.popup__price');
      var adType = cardTemplateItem.querySelector('h4');
      var adRoomGuest = cardTemplateItem.querySelector('p:nth-of-type(3)');
      var adCheck = cardTemplateItem.querySelector('p:nth-of-type(4)');
      var adFeatures = cardTemplateItem.querySelector('.popup__features');
      var adDescription = cardTemplateItem.querySelector('p:nth-of-type(5)');
      var adAvatar = cardTemplateItem.querySelector('.popup__avatar');

      adTitle.textContent = array[i].offer.title;
      adAdress.textContent = array[i].offer.adress;
      adPrice.innerHTML = array[i].offer.price + '&#x20bd;/ночь';

      if (array[i].offer.type === 'flat') {
        adType.textContent = 'Квартира';
      } else if (array[i].offer.type === 'bungalo') {
        adType.textContent = 'Бунгало';
      } else {
        adType.textContent = 'Дом';
      }

      adRoomGuest.textContent = array[i].offer.rooms + ' комнаты ' + 'для ' + array[i].offer.guests + ' гостей';
      adCheck.textContent = 'Заезд после ' + array[i].offer.checkin + ', выезд до ' + array[i].offer.checkout;
      adFeatures.innerHTML = '';
      adFeatures.appendChild(renderFeatures(array[i].offer.features));
      adDescription.textContent = array[i].offer.description;
      adAvatar.setAttribute('src', array[i].author.avatar);
      cardTemplateItem.classList.add('hidden');
      window.utils.map.insertBefore(cardTemplateItem, mapFiltersContainer);
    }
  };

  var removeCards = function () {
    var cards = window.utils.map.querySelectorAll('.popup');
    cards.forEach(function (elem) {
      elem.remove();
    });
  };

  window.showcard = {
    createOffers: createOffers,
    removeCards: removeCards
  };
})();
