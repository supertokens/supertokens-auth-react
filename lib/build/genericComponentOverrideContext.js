'use strict';

var utils = require('./utils.js');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var superTokens = require('./superTokens.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var createGenericComponentsOverrideContext = function (v, key) {
    if (v === void 0) { v = {}; }
    var genericContext = React__default.default.createContext(v);
    var useComponentsOverrideContext = function () {
        var _a;
        var contextValue = React__default.default.useContext(genericContext);
        return utils.__assign(utils.__assign({}, (_a = superTokens.SuperTokens.getInstance()) === null || _a === void 0 ? void 0 : _a.componentOverrides[key]), contextValue);
    };
    var Provider = function (_a) {
        var children = _a.children, components = _a.components;
        return jsxRuntime.jsx(genericContext.Provider, utils.__assign({ value: components }, { children: children }));
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
