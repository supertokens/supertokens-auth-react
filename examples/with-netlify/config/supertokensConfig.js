let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

function getBackendConfig() {
    return {
        framework: "awsLambda",
        supertokens: {
            connectionURI: "https://try.supertokens.io",
        },
        appInfo: {
            appName: "SuperTokens Demo",
            apiDomain: process.env.SITE_NAME + ".netlify.app",
            websiteDomain: process.env.SITE_NAME + ".netlify.app",
            apiBasePath: "/.netlify/functions/auth",
        },
        recipeList: [EmailPassword.init(), Session.init()],
        isInServerlessEnv: true,
    };
}

module.exports.getBackendConfig = getBackendConfig;
