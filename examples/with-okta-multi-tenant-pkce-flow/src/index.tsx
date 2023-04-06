import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import * as reactRouterDom from "react-router-dom";

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSupertokensReactRouterDomRoutes } from "supertokens-auth-react/prebuiltui";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";

import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";

import Index from "./routes/index";
import Dashboard from "./routes/dashboard";
import { PreAndPostAPIHookAction } from "supertokens-web-js/recipe/thirdparty";

SuperTokens.init({
    appInfo: {
        appName: "Demo",
        // TODO Update as per your app's Website and API domains
        apiDomain: "http://localhost:8000",
        websiteDomain: "http://localhost:3000",
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        // Adding a custom provider with id "okta". Also adding a custom button component for the provider.
                        // ref: https://supertokens.com/docs/thirdparty/common-customizations/sign-in-and-up/custom-providers
                        id: "okta",
                        name: "Okta",
                        buttonComponent: (
                            <div
                                style={{
                                    cursor: "pointer",
                                    border: "1",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    borderRadius: "5px",
                                    borderStyle: "solid",
                                }}>
                                Login with Okta
                            </div>
                        ),
                    },
                ],
            },
            getRedirectionURL: async (context) => {
                // This callback ensures that we redirect the logged in user to the dashboard page after login
                if (context.action === "SUCCESS") {
                    if (context.redirectToPath !== undefined) {
                        // we are navigating back to where the user was before they authenticated
                        return context.redirectToPath;
                    }
                    return "/dashboard";
                }
                return undefined;
            },
            preAPIHook: async (context) => {
                // ref: https://supertokens.com/docs/thirdparty/advanced-customizations/frontend-hooks/pre-api

                let url = context.url;
                let requestInit = context.requestInit;
                let action: PreAndPostAPIHookAction = context.action;

                // Fetching the user entered TenantID from the local storage. This is set in the index route "/"
                const tenant: String | null = window.localStorage.getItem("tenant");

                // Adding the `state` and the `TenantID` as query parameters to the API calls
                // so that the backend can consume them to get the correct Okta config for this tenant.
                if (action === "THIRD_PARTY_SIGN_IN_UP") {
                    // `state` is returned from the provider as a query parameter
                    const queryParams: any = new Proxy(new URLSearchParams(window.location.search), {
                        get: (searchParams: URLSearchParams, prop: any) => searchParams.get(prop),
                    });
                    url += `?state=${queryParams.state}&tenant=${tenant}`;
                } else if (action === "GET_AUTHORISATION_URL") {
                    // `state` comes from the userContext set in the override `generateStateToSendToOAuthProvider` below
                    url += `&state=${context.userContext.stateToProvider}&tenant=${tenant}`;
                }

                return {
                    requestInit,
                    url,
                };
            },
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        generateStateToSendToOAuthProvider: (input) => {
                            // The client generates the state which is sent to Okta. We need to also send this state to the
                            // backend so that it can be saved against the PKCE verifier. In order to send it to the backend,
                            // we need to be able to access the generated state in the preAPIHook callback, and we can do
                            // that via the userContext feature
                            const resp = originalImplementation.generateStateToSendToOAuthProvider(input);
                            input.userContext.stateToProvider = resp;
                            return resp;
                        },
                    };
                },
            },
        }),
        Session.init(),
    ],
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <SuperTokensWrapper>
        <BrowserRouter>
            <Routes>
                {getSupertokensReactRouterDomRoutes(reactRouterDom, [ThirdPartyPreBuiltUI])}
                <Route path="/" element={<Index />} />
                <Route
                    path="dashboard"
                    element={
                        <SessionAuth>
                            <Dashboard />
                        </SessionAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    </SuperTokensWrapper>
);
