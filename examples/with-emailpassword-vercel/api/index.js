const express = require("express");
const SuperTokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const { Google, Github, Apple } = ThirdPartyEmailPassword;
const cors = require("cors");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");
const router = require("./routes");

SuperTokens.init({
  framework: "express",
  supertokens: {
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "https://try.supertokens.com",
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
  },
  appInfo: {
    appName: "TodoApp",
    apiDomain: process.env.VERCEL_URL,
    websiteDomain: process.env.VERCEL_URL,
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth",
  },

  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        // We have provided you with development keys which you can use for testsing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        Google({
          clientId:
            "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
          clientSecret: "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",
        }),
        Github({
          clientId: "467101b197249757c71f",
          clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
        }),
        Apple({
          clientId: "4398792-io.supertokens.example.service",
          clientSecret: {
            keyId: "7M48Y4RYDL",
            privateKey:
              "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
            teamId: "YWQCXGJRJL",
          },
        }),
        // Facebook({
        //     clientSecret: "FACEBOOK_CLIENT_SECRET",
        //     clientId: "FACEBOOK_CLIENT_ID"
        // })
      ],
    }),
    Session.init(), // initializes session features
  ],
});

const app = express();

// ...other middlewares
app.use(
  cors({
    origin: process.env.VERCEL_URL,
    allowedHeaders: ['content-type', ...SuperTokens.getAllCORSHeaders()],
    credentials: true,
  })
 );
 
app.use(middleware());
app.use(express.json());
app.use("/api/v1", router);

// Add this AFTER all your routes
app.use(errorHandler());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

module.exports = app;
