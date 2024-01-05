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
require("../../stylesBoard/board.css");
var request_1 = require("../../api/request");
var react_router_dom_1 = require("react-router-dom");
var RenameBoard_1 = require("./RenameBoard");
var CreateBoard_1 = require("./CreateBoard");
;
function Board() {
    var _a = react_1.useState("Моя тестова дошка"), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState("0"), color = _b[0], setColor = _b[1];
    var _c = react_1.useState(false), listCreate = _c[0], setListCreate = _c[1];
    var _d = react_1.useState(true), buttonHidden = _d[0], setButtonHidden = _d[1];
    var _e = react_1.useState(""), inputValue = _e[0], setInputValue = _e[1];
    var _f = react_1.useState(), boards = _f[0], setBoards = _f[1];
    var _g = react_1.useState(1), position = _g[0], setPosition = _g[1];
    var inputRef = react_1.useRef(null);
    var handleInputChange = function (event) { return setInputValue(event.target.value); };
    function handleCreateButton() {
        setListCreate(true);
        setButtonHidden(false);
    }
    var handleCloseButton = function () {
        setListCreate(false);
        setButtonHidden(true);
    };
    var closeButton = '/close.png';
    var id = window.location.pathname.split("/").pop();
    function postResponse() {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setPosition(position + 1);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(inputValue.trim() !== "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, request_1["default"].post("https://trello-back.shpp.me/maliiev/api/v1/board/" + id + "/list", {
                                title: inputValue,
                                position: position
                            })];
                    case 2:
                        _a.sent();
                        setListCreate(false);
                        setInputValue("");
                        setButtonHidden(true);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var OneCardCreated = function (newBoard) { return setBoards(newBoard); };
    var OnePutRequest = function (newRequest) { return setTitle(newRequest); };
    function handleEnter(event, callback) {
        if (event.key === "Enter") {
            callback();
        }
    }
    function progresBar() {
        request_1["default"].interceptors.request.use(function (response) {
            // Do something before request is sent
            return response;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
    return (react_1["default"].createElement("div", { className: "Board", style: { background: color } },
        react_1["default"].createElement("div", { className: 'container' },
            react_1["default"].createElement("header", { className: 'Board__header' },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/board" },
                    react_1["default"].createElement("button", { className: "Board__header-btn btn", type: "submit" }, "\u2190 \u0434\u043E\u043C\u043E\u0439")),
                react_1["default"].createElement(RenameBoard_1["default"], { OnePutRequest: OnePutRequest }),
                react_1["default"].createElement("div", { className: 'Board__header-block' })),
            react_1["default"].createElement("section", { className: 'Board__section' },
                react_1["default"].createElement(CreateBoard_1["default"], { OneCardCreated: OneCardCreated }),
                react_1["default"].createElement("div", { className: 'List', draggable: "true" },
                    listCreate && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("input", { className: "List__input", type: "text", placeholder: '\u0412\u0432\u0435\u0434i\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043E\u0448\u043A\u0438', onChange: handleInputChange, onKeyDown: function (event) { handleEnter(event, postResponse); }, autoFocus: true }),
                        react_1["default"].createElement("div", { className: 'List__items' },
                            react_1["default"].createElement("button", { className: 'List__items-btn', onClick: postResponse }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A"),
                            react_1["default"].createElement("button", { className: 'List__items-close', onClick: handleCloseButton },
                                react_1["default"].createElement("img", { src: closeButton, alt: "", width: "70px" }))))),
                    buttonHidden && react_1["default"].createElement("input", { className: "List__btn", type: 'submit', value: "+ \u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A", onClick: handleCreateButton }))))));
}
exports["default"] = Board;
