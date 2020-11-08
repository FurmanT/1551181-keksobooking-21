'use strict';
const URL_GET_DATA = "https://21.javascript.pages.academy/keksobooking/data";
const URL_POST_DATA = "https://21.javascript.pages.academy/keksobooking";
const RESPONSE_TYPE = 'json';
const RequestMethod = {
  POST: "POST",
  GET: "GET",
};

const loadData = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE;

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
  xhr.open(RequestMethod.GET, URL_GET_DATA);
  xhr.send();
};

const uploadData = function (data, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE;
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
  xhr.open(RequestMethod.POST, URL_POST_DATA);
  xhr.send(data);
};

window.server = {
  loadData: loadData,
  uploadData: uploadData,
};

