import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailpassword, {
    Github,
    Google,
    ThirdPartyEmailPasswordAuth,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import "./App.css";
import Home from "./Home";
import { useState, ChangeEvent, useEffect } from "react";
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
                        EmailVerificationSendVerifyEmail_Override: () => {
                            const [state, setState] = useState({
                                otp: "",
                                invalidOtpMessage: "",
                                sentEmailState: "",
                            });

                            // send email verification otp email on initial load
                            useEffect(() => {
                                sendEmail();
                            }, []);

                            const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                                setState({
                                    ...state,
                                    otp: event.target.value,
                                });
                            };

                            // function to send email verification otp email
                            async function sendEmail() {
                                let config = {
                                    method: "post",
                                    url: `${getApiDomain()}/auth/user/email/verify/token`,
                                };

                                return await axios(config);
                            }

                            // this function is called when resend email button is clicked
                            async function resendEmail() {
                                let response = await sendEmail();

                                if (response.data.status === "OK") {
                                    setState({
                                        ...state,
                                        sentEmailState: "Email sent",
                                    });
                                }
                            }

                            // function handles sending the otp to be verified on the backend
                            async function sendCode() {
                                var data = JSON.stringify({
                                    method: "token",
                                    token: state.otp,
                                });

                                let config = {
                                    method: "post",
                                    url: `${getApiDomain()}/auth/user/email/verify`,
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    data: data,
                                };

                                let response = await axios(config);

                                if (response.data.status === "OK") {
                                    // if correct correct otp is entered, we refresh the page and user can access the protected route
                                    window.location.reload();
                                } else {
                                    // if invalid otp is entered Invalid OTP message is displayed
                                    setState({
                                        ...state,
                                        invalidOtpMessage: "Invalid OTP",
                                    });
                                }
                            }

                            return (
                                <div
                                    style={{
                                        backgroundColor: "#fff",
                                        boxShadow: "0px 0px 6px #ddd",
                                        border: "1px solid #dddddd",
                                        padding: "60px 40px",
                                        width: "500px",
                                        margin: "auto",
                                        marginTop: "80px",
                                        borderRadius: "12px",
                                        alignContent: "center",
                                        display: "block",
                                    }}>
                                    <p
                                        style={{
                                            fontFamily: "Helvetica",
                                            fontSize: "24px",
                                            color: "#000000",
                                            fontWeight: "700",
                                        }}>
                                        {" "}
                                        Enter OTP
                                    </p>
                                    <br />
                                    <div style={{ color: "#FF1717" }}>{state.invalidOtpMessage}</div>
                                    <br />
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        onChange={handleChange}
                                        value={state.otp}
                                        style={{
                                            fontFamily: "Helvetica",
                                            fontSize: "18px",
                                            color: "#000000",
                                            fontWeight: "400",
                                            backgroundColor: "#fafafa",
                                            border: "1px solid #ddd",
                                            padding: "4px 4px",
                                            borderRadius: "4px",
                                        }}
                                    />
                                    <div>
                                        <button
                                            onClick={sendCode}
                                            style={{
                                                backgroundColor: "#007aff",
                                                marginTop: "32px",
                                                padding: "8px 12px",
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#ffffff",
                                                borderRadius: "8px",
                                                border: "1px solid #007aff",
                                            }}>
                                            Submit
                                        </button>
                                    </div>
                                    <br />
                                    <div
                                        style={{
                                            color: "#50C878",
                                        }}>
                                        {state.sentEmailState}
                                    </div>
                                    <br />
                                    <button
                                        onClick={resendEmail}
                                        style={{
                                            backgroundColor: "#ffffff",
                                            paddingTop: "20px",
                                            fontSize: "16px",
                                            fontWeight: "700",
                                            color: "#007aff",
                                            border: "1px solid #ffffff",
                                        }}>
                                        Resend Email
                                    </button>
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
