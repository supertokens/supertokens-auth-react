let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

module.exports.getBackendConfig = () => {
    return {
        framework: "awsLambda",
        supertokens: {
            connectionURI: "https://try.supertokens.io",
        },
        appInfo: {
            appName: "SuperTokens Demo",
            apiDomain: "https://0ktsu4mmb6.execute-api.us-east-1.amazonaws.com",
            websiteDomain: "http://localhost:8888",
            apiBasePath: "/auth",
            apiGatewayPath: "/dev", // use this if you are using AWS API Gateway. The value should be equal to the stage value. i.e. if your stage in API Gateway is prod, this value should be /prod
        },
        recipeList: [EmailPassword.init(), Session.init()],
        isInServerlessEnv: true,
    };
};
