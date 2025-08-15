"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(
        undefined,
        genericComponentOverrideContext.Multitenancy.RECIPE_ID
    ),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.useContext = useContext;
