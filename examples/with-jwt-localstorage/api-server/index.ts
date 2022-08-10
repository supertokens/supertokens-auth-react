import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification, { EmailVerificationClaim } from "supertokens-node/recipe/emailverification";
import { makeSessionContainerFromJWT } from "./sessionContainer";
import JsonWebToken, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import SuperTokensError from "supertokens-node/lib/build/error";
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

let client = jwksClient({
    jwksUri: apiDomain + "/auth/jwt/jwks.json",
});

function getJWTKey(header: JwtHeader, callback: SigningKeyCallback) {
    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key!.getPublicKey();
        callback(err, signingKey);
    });
}

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.com",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",
            override: {
                apis: (originalImplementation) => ({
                    ...originalImplementation,
                    isEmailVerifiedGET: async (input) => {
                        const isVerified = await EmailVerification.isEmailVerified(
                            input.session.getUserId(input.userContext)
                        );

                        let accessTokenResp = await Session.createJWT(
                            {
                                ...input.session.getAccessTokenPayload(input.userContext),
                                sub: input.session.getUserId(input.userContext),
                                ...(await EmailVerificationClaim.build(
                                    input.session.getUserId(input.userContext),
                                    input.userContext
                                )),
                            },
                            2630000
                        ); // alive for 1 month

                        if (accessTokenResp.status === "UNSUPPORTED_ALGORITHM_ERROR") {
                            throw new Error("Should never come here");
                        }

                        // we send a custom response with the JWT
                        input.options.res.sendJSONResponse({
                            status: "OK",
                            isVerified,
                            jwt: accessTokenResp.jwt,
                        });

                        return {
                            status: "OK",
                            isVerified,
                        };
                    },
                    verifyEmailPOST: async (input) => {
                        const res = await EmailVerification.verifyEmailUsingToken(input.token, input.userContext);

                        if (input.session && res.status === "OK") {
                            const updatedTokenPayload = {
                                ...input.session.getAccessTokenPayload(input.userContext),
                                sub: input.session.getUserId(input.userContext),
                                ...(await EmailVerificationClaim.build(
                                    input.session.getUserId(input.userContext),
                                    input.userContext
                                )),
                            };
                            let accessTokenResp = await Session.createJWT(updatedTokenPayload, 2630000); // alive for 1 month

                            if (accessTokenResp.status === "UNSUPPORTED_ALGORITHM_ERROR") {
                                throw new Error("Should never come here");
                            }

                            // we send a custom response with the JWT
                            input.options.res.sendJSONResponse({
                                ...res,
                                jwt: accessTokenResp.jwt,
                            });
                        }

                        return res;
                    },
                }),
            },
        }),
        EmailPassword.init({
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        // We override these to inject our new JWT into the
                        // response from these APIs
                        signInPOST: async function (input) {
                            let resp = await oI.signInPOST!(input);
                            if (resp.status === "OK") {
                                let session = resp.session;
                                let jwt = session.getAccessToken();

                                // we send a custom response with the JWT
                                input.options.res.sendJSONResponse({
                                    status: resp.status,
                                    user: resp.user,
                                    jwt,
                                });
                            }
                            return resp;
                        },
                        signUpPOST: async function (input) {
                            let resp = await oI.signUpPOST!(input);
                            if (resp.status === "OK") {
                                let session = resp.session;
                                let jwt = session.getAccessToken();

                                // we send a custom response with the JWT
                                input.options.res.sendJSONResponse({
                                    status: resp.status,
                                    user: resp.user,
                                    jwt,
                                });
                            }
                            return resp;
                        },
                    };
                },
            },
        }),
        Session.init({
            jwt: {
                // this will enable the JWT recipe and JWKs endpoint
                enable: true,
            },
            override: {
                functions: (oI) => {
                    return {
                        getSession: async function (input) {
                            // we get the JWT from the request header
                            let jwt = input.req.getHeaderValue("authorization");
                            jwt = jwt!.split(" ")[1]; // the input is "Bearer JWT". So we get the JWT part
                            if (jwt === undefined || jwt === null) {
                                if (input.options?.sessionRequired === false) {
                                    return undefined;
                                }
                                throw new Session.Error({
                                    message: "JWT does not exist",
                                    type: "UNAUTHORISED",
                                });
                            }

                            // we verify the JWT
                            let success = await new Promise((resolve) =>
                                JsonWebToken.verify(jwt!, getJWTKey, {}, function (err) {
                                    if (err) {
                                        resolve(false);
                                    } else {
                                        resolve(true);
                                    }
                                })
                            );

                            // if success, we return a session container object, else 401
                            if (success) {
                                return makeSessionContainerFromJWT(jwt);
                            } else {
                                if (input.options?.sessionRequired === false) {
                                    return undefined;
                                }
                                throw new Session.Error({
                                    message: "JWT is invalid",
                                    type: "UNAUTHORISED",
                                });
                            }
                        },
                        createNewSession: async function (input) {
                            let accessTokenResp = await Session.createJWT(
                                {
                                    ...input.accessTokenPayload,
                                    sub: input.userId,
                                },
                                2630000
                            ); // alive for 1 month

                            if (accessTokenResp.status === "UNSUPPORTED_ALGORITHM_ERROR") {
                                throw new Error("Should never come here");
                            }
                            return makeSessionContainerFromJWT(accessTokenResp.jwt);
                        },
                        getAccessTokenLifeTimeMS: async function (input) {
                            return 2630000 * 1000;
                        },
                        getAllSessionHandlesForUser: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        getRefreshTokenLifeTimeMS: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        getSessionInformation: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        refreshSession: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        regenerateAccessToken: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        revokeAllSessionsForUser: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        updateAccessTokenPayload: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        revokeMultipleSessions: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        revokeSession: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        updateSessionData: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        getGlobalClaimValidators: async function (input) {
                            return oI.getGlobalClaimValidators(input);
                        },
                        mergeIntoAccessTokenPayload: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        assertClaims: async function (input) {
                            const { invalidClaims } = await Session.validateClaimsInJWTPayload(
                                input.session.getUserId(input.userContext),
                                input.session.getAccessTokenPayload(input.userContext),
                                () => input.claimValidators,
                                input.userContext
                            );
                            if (invalidClaims.length > 0) {
                                throw new SuperTokensError({
                                    type: "INVALID_CLAIMS",
                                    message: "INVALID_CLAIMS",
                                    payload: invalidClaims,
                                });
                            }
                        },
                        validateClaimsForSessionHandle: oI.validateClaimsForSessionHandle,
                        validateClaimsInJWTPayload: oI.validateClaimsInJWTPayload,
                        fetchAndSetClaim: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        setClaimValue: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                        getClaimValue: oI.getClaimValue,
                        removeClaim: async function (input) {
                            throw new Error("Unsupported operation");
                        },
                    };
                },
            },
        }),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", "Authorization", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    res.send({
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
