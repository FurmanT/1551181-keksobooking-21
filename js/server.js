'use strict';
const URL_GET_DATA = "https://21.javascript.pages.academy/keksobooking/data";
const URL_POST_DATA = "https://21.javascript.pages.academy/keksobooking";
const RESPONSE_TYPE = 'json';
const RequestMethod = {
  POST: "POST",
  GET: "GET",
};
const errorMap = {
  400: "Неверный запрос",
  404: "Страница не найдена",
  200: "OK",
};

const loadData = (onSuccess, onError) => {
  const xhr = createRequest(onSuccess, onError);
  xhr.open(RequestMethod.GET, URL_GET_DATA);
  xhr.send();
};

const uploadData = (data, onSuccess, onError) => {
  const xhr = createRequest(onSuccess, onError);
  xhr.open(RequestMethod.POST, URL_POST_DATA);
  xhr.send(data);
};

const createRequest = (onSuccess, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE;
  xhr.addEventListener('load', function () {
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = errorMap[400];
        break;
      case 404:
        error = errorMap[404];
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener('error', () => {
    onError('Произошла ошибка соединения');
  });
  return xhr;
};

window.server = {
  loadData: loadData,
  uploadData: uploadData,
};

