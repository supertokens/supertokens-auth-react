"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeComponentsOverrideContextProvider = exports.useOverrideContext = void 0;
var genericComponentOverrideContext_1 = require("../../components/componentOverride/genericComponentOverrideContext");
var _a = (0, genericComponentOverrideContext_1.createGenericComponentsOverrideContext)(),
    useOverrideContext = _a[0],
    Provider = _a[1];
exports.useOverrideContext = useOverrideContext;
exports.RecipeComponentsOverrideContextProvider = Provider;
