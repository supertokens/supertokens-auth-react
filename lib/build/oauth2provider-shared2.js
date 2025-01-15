"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./oauth2provider-shared.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(
        undefined,
        recipe.OAuth2Provider.RECIPE_ID
    ),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.useContext = useContext;
