"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var request_1 = require("../../api/request");
require("../../stylesBoard/board.css");
var Card_1 = require("./Card");
function List(_a) {
    var id = _a.id, title = _a.title, cards = _a.cards;
    //const [inputValue, setInputValue] = useState(title);
    var _b = react_1.useState(false), showInput = _b[0], setShowInput = _b[1];
    var _c = react_1.useState(""), inputValue = _c[0], setInputValue = _c[1];
    var _d = react_1.useState(true), showButton = _d[0], setShowButton = _d[1];
    var handleInputChange = function (event) { return setInputValue(event.target.value); };
    var closeButton = '/close.png';
    var showInputChange = function () {
        setShowButton(false);
        setShowInput(true);
    };
    var boardId = window.location.pathname.split("/").pop();
    function postResponse() {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(inputValue.trim() !== "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, request_1["default"].post("https://trello-back.shpp.me/maliiev/api/v1/board/" + boardId + "/card", {
                                title: inputValue,
                                list_id: id,
                                position: 5,
                                description: "washing process",
                                custom: {
                                    deadline: "2022-08-31 12:00"
                                }
                            })];
                    case 1:
                        _a.sent();
                        setInputValue("");
                        setShowInput(false);
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error post request');
                        setInputValue("");
                        setShowInput(false);
                        setShowButton(true);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var handelCancel = function () {
        setInputValue("");
        setShowInput(false);
        setShowButton(true);
    };
    var handleEnter = function (event, callback) { return (event.key === "Enter") && callback(); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "Board__list" },
            react_1["default"].createElement("p", { className: 'Board__list-title' }, title),
            react_1["default"].createElement("div", { className: "Board__list-card" },
                cards.map(function (card) { return (react_1["default"].createElement(Card_1["default"], { id: card.id, title: card.title })); }),
                showInput && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("input", { className: 'Board__list-input', value: inputValue, onKeyDown: function (event) { handleEnter(event, postResponse); }, placeholder: "\u0412\u0432\u0435\u0434i\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u043A\u0430\u0440\u0442\u043A\u0438", onChange: handleInputChange, autoFocus: true }),
                    react_1["default"].createElement("div", { className: 'Board__add' },
                        react_1["default"].createElement("button", { className: 'Board__add-card', onClick: postResponse }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u043A\u0430\u0440\u0442\u043A\u0443"),
                        react_1["default"].createElement("button", { className: 'Board__none-card', onClick: handelCancel },
                            react_1["default"].createElement("img", { src: closeButton, alt: "", width: "70px" }))))),
                showButton && react_1["default"].createElement("button", { className: "Board__list-button", type: "submit", onClick: showInputChange }, "+ \u0414\u043E\u0434\u0430\u0442\u0438 \u043A\u0430\u0440\u0442\u043A\u0443")))));
}
exports["default"] = List;
