import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import "./App.css";
import clients from "./clients.json";

const tenantId = "tenant2";
const clientId = clients[tenantId].clientId;

const redirectURI = `http://localhost:3012/auth/callback`;
const logoutURI = `http://localhost:3012/loggedout`;
const oidcConfig: AuthProviderProps = {
    client_id: clientId,
    authority: `http://localhost:3001/auth`,
    response_type: "code",
    redirect_uri: redirectURI,
    scope: "openid offline_access",
    extraQueryParams: {
        tenant_id: tenantId,
    },
};

function AuthPage() {
    const { signinRedirect, signoutRedirect, user } = useAuth();

    return (
        <div className="App">
            <h1 style={{ textAlign: "center" }}>OAuth2 Example With Generic OAuth2 Lib</h1>
            <div>
                {user ? (
                    <div className="center">
                        <pre>{JSON.stringify(user.profile, null, 2)}</pre>
                        <button onClick={() => signoutRedirect()}>Logout</button>
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
