"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.useContext = useContext;
