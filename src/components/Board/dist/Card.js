"use strict";
exports.__esModule = true;
// Card.tsx
var react_1 = require("react");
var Card = function (_a) {
    var title = _a.title;
    return (react_1["default"].createElement("div", { className: "Board__card", draggable: "true" },
        react_1["default"].createElement("p", { className: 'Board__card-title' }, title)));
};
exports["default"] = Card;
