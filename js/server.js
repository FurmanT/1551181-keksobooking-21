'use strict';
const loadData = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 404:
        error = 'Страница не найдена';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.open('GET', "https://21.javascript.pages.academy/keksobooking/data");
  xhr.send();
};

const uploadData = function (data, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess();
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 404:
        error = 'Страница не найдена';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.open('POST', "https://21.javascript.pages.academy/keksobooking");
  xhr.send(data);
};

window.server = {
  loadData: loadData,
  uploadData: uploadData,
};

