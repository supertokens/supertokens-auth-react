"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeComponentsOverrideContextConsumer =
    exports.RecipeComponentsOverrideContextProvider =
    exports.useRecipeComponentOverrideContext =
        void 0;
var genericComponentOverrideContext_1 = require("../../components/componentOverride/genericComponentOverrideContext");
var _a = (0, genericComponentOverrideContext_1.createGenericComponentsOverrideContext)(),
    useContext = _a[0],
    Provider = _a[1],
    Consumer = _a[2];
exports.useRecipeComponentOverrideContext = useContext;
exports.RecipeComponentsOverrideContextProvider = Provider;
exports.RecipeComponentsOverrideContextConsumer = Consumer;
