const supertokens = require("supertokens-node")
const Session = require("supertokens-node/recipe/session")
const EmailPassword = require("supertokens-node/recipe/emailpassword")

supertokens.init({
  supertokens: {
    connectionURI: "https://try.supertokens.io",
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: "http://localhost:3000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/api/auth"
  },
  recipeList: [
    EmailPassword.init({
      emailVerificationFeature: {
        mode: "REQUIRED"
      }
    }),
    Session.init()
  ],
});