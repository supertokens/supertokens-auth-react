import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from "./config";

SuperTokens.init(SuperTokensConfig as any);

function App() {
    return (
        <SuperTokensWrapper>
            <ComponentWrapper>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), PreBuiltUIList)}
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
