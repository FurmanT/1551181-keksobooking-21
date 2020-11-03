const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/page.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/debounce.js",
    "./js/map.js",
    "./js/resultSend.js",
    "./js/form.js",
    "./js/main.js",
    "./js/server.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};







