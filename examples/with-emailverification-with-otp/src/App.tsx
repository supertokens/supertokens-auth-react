import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailpassword, {
    Github,
    Google,
    ThirdPartyEmailPasswordAuth,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import "./App.css";
import Home from "./Home";
import { useState, ChangeEvent } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

Session.addAxiosInterceptors(axios);

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        ThirdPartyEmailpassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init()],
            },

            emailVerificationFeature: {
                mode: "REQUIRED",
            },
            override: {
                emailVerification: {
                    components: {
                        EmailVerificationSendVerifyEmail_Override: ({ DefaultComponent, ...props }) => {
                            const [otp, setOtp] = useState("");
                            const [message, setMessage] = useState("");

                            const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                                setOtp(event.target.value);
                            };

                            async function sendCode() {
                                // send a request to verify the user
                                var data = JSON.stringify({
                                    method: "token",
                                    token: otp,
                                });

                                let config = {
                                    method: "post",
                                    url: `http://localhost:3001/auth/user/email/verify`,
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    data: data,
                                };

                                let response = await axios(config);
                                if (response.data.status === "OK") {
                                    window.location.reload();
                                } else {
                                    setMessage("Invalid OTP");
                                }
                            }
                            return (
                                <div>
                                    Enter Emailverification OTP
                                    <br />
                                    <input type="text" id="otp" name="otp" onChange={handleChange} value={otp} />
                                    <button onClick={sendCode}>Submit</button>
                                    <div>{message}</div>
                                    <DefaultComponent {...props} />
                                </div>
                            );
                        },
                    },
                },
            },
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                    <Route
                        path="/"
                        element={
                            /* This protects the "/" route so that it shows 
       <Home /> only if the user is logged in.
       Else it redirects the user to "/auth" */
                            <ThirdPartyEmailPasswordAuth>
                                <Home />
                            </ThirdPartyEmailPasswordAuth>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
