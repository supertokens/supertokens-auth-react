"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./emailpassword-shared3.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(
        undefined,
        recipe.EmailPassword.RECIPE_ID
    ),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.useContext = useContext;
