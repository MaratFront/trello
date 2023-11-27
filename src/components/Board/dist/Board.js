"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../stylesBoard/board.css");
var List_1 = require("./List");
var dragOnDrop_1 = require("./dragOnDrop");
function Board() {
    var _a = react_1.useState("Моя тестова дошка"), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState([
        {
            id: 1,
            title: "Плани",
            cards: [
                { id: 1, title: "помити кота" },
                { id: 2, title: "приготувати суп" },
                { id: 3, title: "сходити в магазин" },
            ]
        },
        {
            id: 2,
            title: "В процесі",
            cards: [
                { id: 4, title: "подивитися серіал" },
            ]
        },
        {
            id: 3,
            title: "Зроблено",
            cards: [
                { id: 5, title: "зробити домашку" },
                { id: 6, title: "погуляти з собакой" },
            ]
        }
    ]), lists = _b[0], setLists = _b[1];
    react_1.useEffect(function () {
        dragOnDrop_1["default"]();
    }, []);
    return (react_1["default"].createElement("div", { className: "Board" },
        react_1["default"].createElement("div", { className: 'container' },
            react_1["default"].createElement("header", { className: 'Board__header' },
                react_1["default"].createElement("button", { className: "Board__header-btn btn", type: "submit" }, "\u2190 \u0434\u043E\u043C\u043E\u0439"),
                react_1["default"].createElement("p", { className: 'Board__header-title' }, title),
                react_1["default"].createElement("div", { className: 'Board__header-block' })),
            react_1["default"].createElement("section", { className: 'Board__section' },
                lists.map(function (list) { return (react_1["default"].createElement(List_1["default"], { title: list.title, cards: list.cards })); }),
                react_1["default"].createElement("div", { className: 'Board__list', draggable: "true" },
                    react_1["default"].createElement("input", { className: "Board__section-btn", type: 'submit', value: "+ \u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A" })))),
        react_1["default"].createElement("script", { src: "/path/to/drag-on-drop.js" })));
}
exports["default"] = Board;
