"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./multifactorauth-shared2.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(
        undefined,
        recipe.MultiFactorAuth.RECIPE_ID
    ),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.useContext = useContext;
