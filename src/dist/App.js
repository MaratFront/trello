"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
require("./App.css");
var react_router_dom_1 = require("react-router-dom");
var Board_1 = require("./components/Board/Board");
var BoardHome_1 = require("./components/Home/BoardHome");
function App() {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: '/board', element: react_1["default"].createElement(BoardHome_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: '/board/:board_id', element: react_1["default"].createElement(Board_1["default"], null) }))));
}
exports["default"] = App;
