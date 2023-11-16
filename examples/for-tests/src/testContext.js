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
        clientType: localStorage.getItem("clientType") || undefined,
        signUpFormFieldConfig: {
            showIncorrectFields: localStorage.getItem("SHOW_INCORRECT_FIELDS"),
            incorrectOnChange: localStorage.getItem("INCORRECT_ONCHANGE"),
            incorrectNonOptionalErrorMsg: localStorage.getItem("INCORRECT_NON_OPTIONAL_ERROR_MSG"),
            incorrectGetDefault: localStorage.getItem("INCORRECT_GETDEFAULT"),
            customFieldsWithDefault: localStorage.getItem("SHOW_CUSTOM_FIELDS_WITH_DEFAULT_VALUES"),
            showCustomFields: localStorage.getItem("SHOW_CUSTOM_FIELDS"),
        },
        signInFormFieldConfig: {
            showDefaultFields: localStorage.getItem("SHOW_SIGNIN_DEFAULT_FIELDS"),
            showFieldsWithNonOptionalErrMsg: localStorage.getItem("SHOW_SIGNIN_WITH_NON_OPTIONAL_ERROR_MESSAGE"),
        },
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
