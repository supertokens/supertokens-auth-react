'use strict';

var utils = require('./utils.js');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var createGenericComponentsOverrideContext = function (v) {
    if (v === void 0) { v = {}; }
    var genericContext = React__default.default.createContext(v);
    var useComponentsOverrideContext = function () {
        return React__default.default.useContext(genericContext);
    };
    var Provider = function (_a) {
        var children = _a.children, components = _a.components;
        return jsxRuntime.jsx(genericContext.Provider, utils.__assign({ value: components }, { children: children }));
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
