'use strict';

var logger = require('./logger.js');
var jsxRuntime = require('react/jsx-runtime');
var uiEntry = require('./index2.js');

function AuthComponentWrapper(_a) {
    var children = _a.children, recipeComponentOverrides = _a.recipeComponentOverrides;
    return (jsxRuntime.jsx(uiEntry.ComponentOverrideContext.Provider, logger.__assign({ value: recipeComponentOverrides }, { children: children })));
}

exports.AuthComponentWrapper = AuthComponentWrapper;
