import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth, doesSessionExist } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import { SuperTokensConfig, ComponentWrapper, getApiDomain, getWebsiteDomain } from "./config";
import { useEffect, useRef } from "react";
import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import clients from "./clients.json";
import "./App.css";

SuperTokens.init(SuperTokensConfig);

const tenantId = "tenant1";
const clientId = clients[tenantId].clientId;

const redirectURI = `${getWebsiteDomain()}/auth/callback`;
const oidcConfig: AuthProviderProps = {
    client_id: clientId,
    authority: `${getApiDomain()}/auth`,
    response_type: "code",
    redirect_uri: redirectURI,
    scope: "openid offline_access",
    skipSigninCallback: true,
    extraQueryParams: {
        tenant_id: tenantId,
    },
};

function AuthPage() {
    const navigate = useNavigate();
    const authCallbackHandled = useRef<boolean>(false);
    const { signinRedirect, signoutSilent, isLoading, user, error } = useAuth();

    useEffect(() => {
        // Redirect to home if supertokens session exists
        doesSessionExist().then((sessionExists) => {
            if (sessionExists) {
                navigate("/");
            }
        });
    }, []);

    useEffect(() => {
        if (authCallbackHandled.current) return;

        const params = new URLSearchParams(window.location.search);
        if (params.get("code") === null || params.get("state") === null) return;

        authCallbackHandled.current = true;

        async function handleSign() {
            const state = params.get("state");
            const savedInfo = localStorage.getItem(`oidc.${state}`);
            if (!savedInfo) return;
            const { id, code_verifier } = JSON.parse(savedInfo);
            if (id !== state) return;

            const res = await fetch(`${getApiDomain()}/auth/oauth/client/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clientId,
                    redirectURIInfo: {
                        redirectURI: redirectURI,
                        redirectURIQueryParams: Object.fromEntries(params.entries()),
                        pkceCodeVerifier: code_verifier,
                    },
                }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.status === "OK") {
                    navigate("/");
                } else {
                    // setIsLoading(false);
                    window.alert("Login Failed ");
                }
            }
        }

        handleSign();
    }, [user, navigate, signoutSilent]);

    if (isLoading || user) {
        return (
            <div className="App">
                <p style={{ textAlign: "center" }}>Loading...</p>
            </div>
        );
    }

    return (
        <div className="App">
            <h1 style={{ textAlign: "center" }}>OAuth2 Example With Supertokens</h1>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <div>
                <div className="center">
                    <button onClick={() => signinRedirect()}>Login With SuperTokens</button>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <SuperTokensWrapper>
            <ComponentWrapper>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                                <Route
                                    path="/auth/*"
                                    element={
                                        <AuthProvider {...oidcConfig}>
                                            <AuthPage />
                                        </AuthProvider>
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows
                                        <Home /> only if the user is logged in.
                                        Else it redirects the user to "/auth" */
                                        <SessionAuth>
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </ComponentWrapper>
        </SuperTokensWrapper>
    );
}

export default App;
