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
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
require("../../stylesHome/home.css");
var request_1 = require("../../api/request");
var CreateBoard_1 = require("./CreateBoard");
function BoardHome() {
    var _this = this;
    var _a = react_1.useState({}), homeItems = _a[0], setHomeItems = _a[1];
    var _b = react_1.useState(''), inputValue = _b[0], setInputValue = _b[1];
    var _c = react_1.useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var openModal = function () {
        setIsModalOpen(true);
    };
    var closeModalOk = function () {
        setIsModalOpen(false);
        setInputValue('');
    };
    function OneCardCreated(newBoard) {
        setHomeItems(newBoard);
    }
    var handleInputChange = function (event) {
        setInputValue(event.target.value);
    };
    var handleAddBoard = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(inputValue.trim() !== '')) return [3 /*break*/, 2];
                    return [4 /*yield*/, request_1["default"].post("https://trello-back.shpp.me/maliiev/api/v1" + "/board", {
                            title: inputValue,
                            custom: {
                                description: "#61dafb"
                            }
                        })];
                case 1:
                    _a.sent();
                    try {
                        closeModalOk();
                    }
                    catch (error) {
                        console.error('Произошла ошибка при выполнении POST-запроса:', error);
                    }
                    ;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function getResponse() {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request_1["default"]("https://trello-back.shpp.me/maliiev/api/v1/board")];
                        case 1:
                            data = _a.sent();
                            setHomeItems(data);
                            return [2 /*return*/];
                    }
                });
            });
        }
        getResponse();
    }, []);
    return (react_1["default"].createElement("div", { className: "Home" },
        react_1["default"].createElement("div", { className: "Home__container" },
            react_1["default"].createElement("p", { className: "Home__header" }, "\u041C\u043E\u0457 \u0434\u043E\u0448\u043A\u0438"),
            react_1["default"].createElement("div", { className: "Home__items" },
                isModalOpen && (react_1["default"].createElement("div", { className: "Home__modal-overlay" },
                    react_1["default"].createElement("div", { className: "Home__modal-window" },
                        react_1["default"].createElement("div", { className: "Home__modal-header" },
                            react_1["default"].createElement("input", { className: 'Home__modal-input', placeholder: "\u0412\u0432\u0435\u0434i\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043E\u0448\u043A\u0438", type: "text", value: inputValue, onChange: handleInputChange, autoFocus: true }),
                            react_1["default"].createElement("button", { className: 'Home__modal-button', onClick: handleAddBoard }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0448\u043A\u0443")),
                        react_1["default"].createElement("input", { type: "button", className: "Home__modal-close", value: "\u0412\u0438\u0439\u0442\u0438", onClick: closeModalOk })))),
                react_1["default"].createElement(CreateBoard_1["default"], { OneCardCreated: OneCardCreated }),
                react_1["default"].createElement("button", { className: 'Home__button Home__item', onClick: openModal }, "+ \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0434\u043E\u0448\u043A\u0443")))));
}
exports["default"] = BoardHome;
