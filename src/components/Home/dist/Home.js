"use strict";
exports.__esModule = true;
function Home(_a) {
    var title = _a.title, custom = _a.custom;
    return (React.createElement("div", { className: "Home__item", style: { background: custom.background } },
        React.createElement("p", { className: "Home__title" }, title)));
}
exports["default"] = Home;
