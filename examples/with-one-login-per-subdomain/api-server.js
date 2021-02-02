const express = require("express");
const cors = require("cors");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://example.com:${websitePort}`
let whitelist = []
whitelist.push(websiteDomain)
whitelist.push(`http://a.example.com:${websitePort}`)
whitelist.push(`http://b.example.com:${websitePort}`)


let getUserDomain = (email) =>{
    // extracts the userDomain from the email used to sign up
    // ex. from employee@supertokens.com, "supertokens" will be extracted as the userDomain
    let userDomain = email.split("@")[1].split(".")[0] 
    return userDomain
}
supertokens.init({
    supertokens: {
        connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain
    },
    recipeList: [
        EmailPassword.init({
            resetPasswordUsingTokenFeature: {
                getResetPasswordURL: async (user) =>{
                    let {id, email} = user;

                    // getUserDomain is your implementation
                    let userDomain = await getUserDomain(email);

                    return `http://${userDomain}.example.com:${websitePort}/auth/reset-password`;

                }
            },
            emailVerificationFeature: {
                getEmailVerificationURL: async (user) => {
                    let {id, email} = user;

                    // getUserDomain is your implementation
                    let userDomain = await getUserDomain(email);

                    return `http://${userDomain}.example.com:${websitePort}/auth/verify-email`;
                },
                createAndSendCustomEmail: (user, emailVerificationURLWithToken) =>{
                    console.log(emailVerificationURLWithToken)
                }
            },

        }),
        Session.init()
    ]
});

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

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


app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
})

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));