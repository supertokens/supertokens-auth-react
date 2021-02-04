const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain =
  process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain =
  process.env.REACT_APP_WEBSITE_URL || `http://auth.example.com:${websitePort}`;

const domainWhiteList =/^(http?:\/\/([a-z0-9]+[.])example[.]com(?::\d{1,5})?)$/

function getUserDomain (email) {
  // extracts the userDomain from the email used to sign up
  // ex. from employee@supertokens.com, "supertokens" will be extracted as the userDomain
  let userDomain = email.split("@")[1].split(".")[0];
  return userDomain;
};

supertokens.init({
  supertokens: {
    connectionURI: "https://try.supertokens.io",
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain,
    websiteDomain,
    websiteBasePath: "/",
  },
  recipeList: [
    EmailPassword.init({
      resetPasswordUsingTokenFeature: {
        getResetPasswordURL: async (user) => {
          let { email } = user;

          // getUserDomain is your implementation
          let userDomain = await getUserDomain(email);
          return `http://${userDomain}.example.com:${websitePort}/reset-password`;
        },
      },
      emailVerificationFeature: {
        getEmailVerificationURL: async (user) => {
          let { email } = user;

          // getUserDomain is your implementation
          let userDomain = await getUserDomain(email);
          return `http://${userDomain}.example.com:${websitePort}/verify-email`;
        },
      },
    }),
    Session.init(),
  ],
});

const app = express();

app.use(
  cors({
    origin: domainWhiteList,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(supertokens.middleware());

// custom API that requires session verification
app.get("/sessioninfo", Session.verifySession(), async (req, res) => {
  let session = req.session;
  res.send({
    sessionHandle: session.getHandle(),
    userId: session.getUserId(),
    jwtPayload: session.getJWTPayload(),
    sessionData: await session.getSessionData(),
  });
});

app.get("/user-subdomain", Session.verifySession(), async (req, res) => {
  const session = req.session;
  const userDetails = await EmailPassword.getUserById(session.getUserId());
  const subdomain = getUserDomain(userDetails.email);
  res.send({ subdomain });
});

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
  res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () =>
  console.log(`API Server listening on port ${apiPort}`)
);
