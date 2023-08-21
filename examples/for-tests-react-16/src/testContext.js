export function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export function getTestContext() {
    const ret = {
        disableDefaultUI: getQueryParams("disableDefaultUI") === "true",
        thirdPartyRedirectURL: localStorage.getItem("thirdPartyRedirectURL"),
        authRecipe: window.localStorage.getItem("authRecipe") || "emailpassword",
        usesDynamicLoginMethods: localStorage.getItem("usesDynamicLoginMethods") === "true",
        clientRecipeListForDynamicLogin: localStorage.getItem("clientRecipeListForDynamicLogin"),
        mockLoginMethodsForDynamicLogin: localStorage.getItem("mockLoginMethodsForDynamicLogin"),
        staticProviderList: localStorage.getItem("staticProviderList"),
        mockTenantId: localStorage.getItem("mockTenantId"),
        clientType: localStorage.getItem("clientType"),
    };
    return ret;
}

export function getEnabledRecipes() {
    const testContext = getTestContext();

    let enabledRecipes = [];

    if (testContext.usesDynamicLoginMethods) {
        if (testContext.clientRecipeListForDynamicLogin) {
            enabledRecipes = JSON.parse(testContext.clientRecipeListForDynamicLogin);
        } else {
            enabledRecipes = [
                "emailpassword",
                "thirdparty",
                "thirdpartyemailpassword",
                "passwordless",
                "thirdpartypasswordless",
            ];
        }
    } else {
        if (testContext.authRecipe === "both") {
            enabledRecipes.push("emailpassword", "thirdparty");
        } else {
            enabledRecipes.push(testContext.authRecipe);
        }
    }

    return enabledRecipes;
}
