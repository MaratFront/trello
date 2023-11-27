"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function dragOnDrop() {
  var card = document.querySelectorAll(".Board__card-title");
  var list = document.querySelectorAll(".Board__list");
  card.forEach(function (item) {
    item.addEventListener("dragstart", function (e) {
      e.target.style.background = "gray";
      e.target.style.opacity = "50";
    });
  });
}

var _default = dragOnDrop;
exports["default"] = _default;