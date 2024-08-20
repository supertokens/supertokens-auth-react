import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth, doesSessionExist } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import { SuperTokensConfig, ComponentWrapper, getApiDomain, getWebsiteDomain } from "./config";
import { useEffect, useRef } from "react";
import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import "./App.css";

SuperTokens.init(SuperTokensConfig);

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_API_URL || "http://localhost.com:3006";
const clientId = "REPLACE_WITH_YOUR_CLIENT_ID";

const oidcConfig: AuthProviderProps = {
    client_id: clientId,
    authority: `${AUTH_SERVER_URL}/auth`,
    response_type: "code",
    redirect_uri: `${getWebsiteDomain()}/auth/callback`,
    scope: "openid offline_access email",
};

function AuthPage() {
    const navigate = useNavigate();
    const authCallbackHandled = useRef<boolean>(false);
    const { signinRedirect, signoutSilent, isLoading, user } = useAuth();

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
        if (!user?.access_token) return;

        authCallbackHandled.current = true;

        async function handleSign() {
            const res = await fetch(`${getApiDomain()}/auth/oauth/client/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oAuthTokens: {
                        access_token: user?.access_token,
                    },
                }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.status === "OK") {
                    signoutSilent();
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
