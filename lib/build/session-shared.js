"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var types = require("./multifactorauth-shared.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(undefined, types.Session.RECIPE_ID),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.useContext = useContext;
