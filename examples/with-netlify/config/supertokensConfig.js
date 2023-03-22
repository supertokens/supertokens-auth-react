let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
let Dashboard = require("supertokens-node/recipe/dashboard");

function getBackendConfig() {
    return {
        framework: "awsLambda",
        supertokens: {
            connectionURI: "https://try.supertokens.com",
        },
        appInfo: {
            appName: "SuperTokens Demo",
            apiDomain: process.env.SITE_NAME + ".netlify.app",
            websiteDomain: process.env.SITE_NAME + ".netlify.app",
            apiBasePath: "/.netlify/functions/auth",
        },
        recipeList: [EmailPassword.init(), Session.init(), Dashboard.init()],
        isInServerlessEnv: true,
    };
}

module.exports.getBackendConfig = getBackendConfig;
