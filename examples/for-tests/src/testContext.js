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
        enableAllRecipes: localStorage.getItem("enableAllRecipes") === "true",
        clientRecipeListForDynamicLogin: localStorage.getItem("clientRecipeListForDynamicLogin"),
        mockLoginMethodsForDynamicLogin: localStorage.getItem("mockLoginMethodsForDynamicLogin"),
        staticProviderList: localStorage.getItem("staticProviderList"),
        mockTenantId: localStorage.getItem("mockTenantId"),
        clientType: localStorage.getItem("clientType") || undefined,
        firstFactors: localStorage.getItem("firstFactors")?.split(", "),
        formFieldType: {
            signIn: localStorage.getItem("SIGNIN_SETTING_TYPE"),
            signUp: localStorage.getItem("SIGNUP_SETTING_TYPE"),
        },
        enableMFA: localStorage.getItem("enableMFA") === "true",
        defaultToEmail: localStorage.getItem("defaultToEmail") !== "false",
        signoutOnSessionNotExists: localStorage.getItem("signoutOnSessionNotExists") === "true",
        disableRedirectionAfterSuccessfulSignInUp:
            localStorage.getItem("disableRedirectionAfterSuccessfulSignInUp") === "true",
        throwWebauthnError: localStorage.getItem("throwWebauthnError") === "true",
        webauthnErrorStatus: localStorage.getItem("webauthnErrorStatus") || undefined,
        webauthnRecoverAccountErrorStatus: localStorage.getItem("webauthnRecoverAccountErrorStatus") || undefined,
        overrideWebauthnSupport: localStorage.getItem("overrideWebauthnSupport"),
    };
    return ret;
}

export function getEnabledRecipes() {
    const testContext = getTestContext();

    let enabledRecipes = [];

    if (testContext.enableAllRecipes || testContext.authRecipe === "all") {
        enabledRecipes = [
            "emailpassword",
            "thirdparty",
            "thirdpartyemailpassword",
            "passwordless",
            "thirdpartypasswordless",
            "webauthn",
        ];
    } else if (testContext.clientRecipeListForDynamicLogin) {
        enabledRecipes = JSON.parse(testContext.clientRecipeListForDynamicLogin);
    } else if (testContext.usesDynamicLoginMethods) {
        enabledRecipes = [
            "emailpassword",
            "thirdparty",
            "thirdpartyemailpassword",
            "passwordless",
            "thirdpartypasswordless",
            "webauthn",
        ];
    } else {
        if (testContext.authRecipe === "both") {
            enabledRecipes.push("emailpassword", "thirdparty");
        } else {
            enabledRecipes.push(testContext.authRecipe);
        }
    }

    return enabledRecipes;
}
