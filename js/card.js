'use strict';
const blockMap = document.querySelector(".map");
const mapListElement = blockMap.querySelector(`.map__pins`);

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const render = function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  const title = cardElement.querySelector(`.popup__title`);
  if (item.offer.title) {
    title.textContent = item.offer.title;
  } else {
    title.hidden = true;
  }
  const address = cardElement.querySelector(`.popup__text--address`);
  if (item.offer.address) {
    address.textContent = item.offer.address;
  } else {
    address.hidden = true;
  }
  const price = cardElement.querySelector(`.popup__text--price`);
  if (item.offer.price) {
    price.textContent = `${item.offer.price} ₽/ночь`;
  } else {
    price.hidden = true;
  }
  const type = cardElement.querySelector(`.popup__type`);
  if (item.offer.type) {
    type.textContent = window.utils.getDescTypeHousing(item.offer.type);
  } else {
    type.hidden = true;
  }

  const capacity = cardElement.querySelector(`.popup__text--capacity`);
  if (item.offer.rooms && item.offer.guests) {
    capacity.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  } else {
    capacity.hidden = true;
  }

  const time = cardElement.querySelector(`.popup__text--time`);
  if (item.offer.checkin && item.offer.checkout) {
    time.textContent = `Заезд после ${item.offer.checkin}  выезд до ${item.offer.checkout}`;
  } else {
    time.hidden = true;
  }
  const elementFeatures = cardElement.querySelector(`.popup__features`);

  if (item.offer.features) {
    const featuresPopup = elementFeatures.querySelectorAll(".popup__feature");
    const classFeatures = item.offer.features.map(function (name) {
      return "popup__feature--" + name;
    });

    featuresPopup.forEach((feature) => {
      if (classFeatures.indexOf(feature.classList[1]) === -1) {
        feature.remove();
      }
    });
  } else {
    elementFeatures.hidden = true;
  }
  const description = cardElement.querySelector(`.popup__description`);
  if (item.offer.description) {
    description.textContent = item.offer.description;
  } else {
    description.hidden = true;
  }
  const photos = cardElement.querySelector(`.popup__photos`);
  if (item.offer.photos) {
    let elementImg = photos.querySelector(`.popup__photo`);
    item.offer.photos.forEach((photo) => {
      const img = elementImg.cloneNode();
      img.src = photo;
      photos.append(img);
    });
    elementImg.remove();
  } else {
    photos.hidden = true;
  }
  const img = cardElement.querySelector(`.popup__avatar`);
  if (item.author.avatar) {
    img.src = item.author.avatar;
  } else {
    img.hidden = true;
  }
  return cardElement;
};

const create = function (item) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(render(item));
  return fragment;
};

const remove = function () {
  const elementCard = mapListElement.querySelector(".map__card");
  if (elementCard) {
    elementCard.remove();
  }
};

window.card = {
  create: create,
  remove: remove,
};

