const express = require("express");
const cors = require("cors");
const util = require('util');
const morgan = require("morgan");
const helmet = require("helmet");
const mysql = require('mysql');
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Piku$143",
    database: "super_tokesn"
  });
  con.connect();
  const query = util.promisify(con.query).bind(con);

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.io",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
    },
    recipeList: [EmailPassword.init(
        {
                    override: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,

                        signInPOST: async ({formFields, options}) => {
                            console.log(formFields)

                            let email = formFields.filter((f) => f.id === "email")[0].value;
                            let password = formFields.filter((f) => f.id === "password")[0].value;
                        
                           
                            const res = await query(`select * from user where email='${email}'`)
                            if(res.length > 0) {
                                return {
                                    status: 'SESSION_ALREADY_EXISTS'
                                }
                            } 
                            let response = await options.recipeImplementation.signIn({ email, password });
                            if (response.status === "WRONG_CREDENTIALS_ERROR") {
                                return response;
                            }
                            let user = response.user;

                            await Session.createNewSession(options.res, user.id, {}, {});
                            query(`insert into user (email, status) values ('${email}', 'ACTIVE')`)
                            return {
                                status: "OK",
                                user,
                            };
                        },
                        
                    }
                },
            }
    }
    ), Session.init(),
        
    ],
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: websiteDomain, // TODO: Change to your app's website domain
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
app.use(middleware());

// custom API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res) => {
    debugger;
    let session = await Session.getSession(req, res);
    let data = await session.getSessionData()
    console.log('session', data)
    // console.log('Session', Session.getSession(req, res));
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.get("/sessioninfo", verifySession(), async (req, res) => {
    debugger;
    let session = await Session.getSession(req, res);
    let data = await session.getSessionData()
    console.log('session', data)
    // console.log('Session', Session.getSession(req, res));
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.post("/postSignOut", async (req, res) => {
   const email = req.body.email;
   await query(`delete from user where email='${email}'`);
   res.send({
       status: 'OK'
   })

});

app.use(errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
