import { useContext } from "react";
import { AuthContext, AuthProvider } from "react-oauth2-code-pkce";
import { getApiDomain, getWebsiteDomain } from "./config";

const authConfig = {
    clientId: window.localStorage.getItem("oauth2-client-id"),
    authorizationEndpoint: `${getApiDomain()}/auth/oauth2provider/auth`,
    tokenEndpoint: `${getApiDomain()}/auth/oauth2provider/token`,
    redirectUri: `${getWebsiteDomain()}/oauth2/callback`,
    scope: "profile openid offline_access email",
    state: Math.random().toString(36).substring(2),
    autoLogin: false,
    decodeToken: true,
};

function AuthPage() {
    const { tokenData, logIn, logOut, error } = useContext(AuthContext);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>OAuth2 Login Test</h1>
            <div>
                {tokenData ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <pre id="oauth2-token-data">{JSON.stringify(tokenData, null, 2)}</pre>
                        <button id="oauth2-logout-button" onClick={() => logOut()}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {error && <p id="oauth2-error-message">Error: {error}</p>}
                        <button id="oauth2-login-button" onClick={() => logIn()}>
                            Login With SuperTokens
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function OAuth2Page() {
    return (
        <AuthProvider authConfig={authConfig}>
            <AuthPage />
        </AuthProvider>
    );
}
