"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../stylesBoard/board.css");
var Card_1 = require("./Card");
var react_2 = require("react");
function List(_a) {
    var id = _a.id, title = _a.title, cards = _a.cards;
    var _b = react_2.useState(title), inputValue = _b[0], setInputValue = _b[1];
    var _c = react_2.useState(false), cardValue = _c[0], setCardValue = _c[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "Board__list" },
            react_1["default"].createElement("div", { className: "Board__list-card" },
                cards.map(function (card) { return (react_1["default"].createElement(Card_1["default"], { title: card.title })); }),
                react_1["default"].createElement("button", { className: "Board__list-button", type: "submit" }, "+ \u0414\u043E\u0434\u0430\u0442\u0438 \u043A\u0430\u0440\u0442\u043A\u0443")))));
}
exports["default"] = List;
