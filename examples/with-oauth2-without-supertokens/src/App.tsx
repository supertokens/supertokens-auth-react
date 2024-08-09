import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import "./App.css";

const authServerUrl = process.env.REACT_APP_AUTH_SERVER_API_URL || "http://localhost:3006";
const clientId = "REPLACE_WITH_YOUR_CLIENT_ID";

const oidcConfig: AuthProviderProps = {
    client_id: clientId,
    authority: `${authServerUrl}/auth`,
    response_type: "code",
    redirect_uri: "http://localhost:3000",
    scope: "openid offline_access email",
    revokeTokensOnSignout: true,
    onSigninCallback: async () => {
        // Clears the response code and other params from the callback url
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};

function AuthPage() {
    const { signinRedirect, signoutSilent, user } = useAuth();

    return (
        <div className="App">
            <h1 style={{ textAlign: "center" }}>OAuth2 Example With Generic OAuth2 Lib</h1>
            <div>
                {user ? (
                    <div className="center">
                        <pre>{JSON.stringify(user.profile, null, 2)}</pre>
                        <button onClick={() => signoutSilent()}>Logout</button>
                    </div>
                ) : (
                    <div className="center">
                        <button onClick={() => signinRedirect()}>Login With SuperTokens</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider {...oidcConfig}>
            <AuthPage />
        </AuthProvider>
    );
}
