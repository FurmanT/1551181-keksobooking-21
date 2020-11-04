'use strict';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const addPreview = function (elementFile, elementPreviewFile) {

  elementFile.addEventListener('change', function () {
    const file = elementFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        if (elementPreviewFile.tagName === "IMG") {
          elementPreviewFile.src = reader.result;
        } else {
          const elementImg = document.createElement("img");
          elementImg.setAttribute("alt", "Фотография");
          elementImg.setAttribute("width", elementPreviewFile.offsetWidth);
          elementImg.setAttribute("height", elementPreviewFile.offsetHeight);
          elementImg.src = reader.result;
          elementPreviewFile.append(elementImg);
        }
      });
      reader.readAsDataURL(file);
    }
  });
};

window.file = {
  addPreview: addPreview,
};
