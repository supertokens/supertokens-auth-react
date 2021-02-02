const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain =
  process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain =
  process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
  supertokens: {
    connectionURI: "https://try.supertokens.io",
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain,
    websiteDomain,
  },
  recipeList: [
    EmailPassword.init({
      signUpFeature: {
        formFields: [
          {
            id: "username",
            validate: async (value) => {
                console.log(value);
                return 'Fo'
            },
          },
        ],
        handleCustomFormFieldsPostSignUp: async (user, formFields) => {
          console.log(user);
          console.log(formFields);
          let { id, email } = user;
        },
      },
    }),
    Session.init(),
  ],
});

const app = express();

app.use(
  cors({
    origin: websiteDomain,
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

app.get('/validate-username/:username', async (req, res) => {
    console.log(req.params.username);
    res.send({valid: false})
})

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
  res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () =>
  console.log(`API Server listening on port ${apiPort}`)
);
