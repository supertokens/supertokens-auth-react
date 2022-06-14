"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeBase = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
/*
 * Component
 */
var ThemeBase = function (_a) {
    var children = _a.children,
        loadDefaultFont = _a.loadDefaultFont;
    return (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                (0, jsx_runtime_1.jsx)("link", {
                    href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
        ],
    });
};
exports.ThemeBase = ThemeBase;
