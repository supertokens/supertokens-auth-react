import React, { useEffect, useState } from "react";
import { BaseComponent, Home } from "./App";
import { getRoutingComponent, canHandleRoute } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { WebauthnPreBuiltUI } from "supertokens-auth-react/recipe/webauthn/prebuiltui";
import { getEnabledRecipes } from "./testContext";

function AppWithoutRouter() {
    return (
        <div className="App">
            <Nav />
            <h1>Without Routing</h1>
            <a href="/home">Switch</a>
            <Routing></Routing>
        </div>
    );
}

function Routing() {
    const enabledRecipes = getEnabledRecipes();
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

    let recipePreBuiltUIList = [];
    if (enabledRecipes.some((r) => r.startsWith("thirdparty"))) {
        recipePreBuiltUIList.push(ThirdPartyPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("emailpassword"))) {
        recipePreBuiltUIList.push(EmailPasswordPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("passwordless"))) {
        recipePreBuiltUIList.push(PasswordlessPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("webauthn"))) {
        recipePreBuiltUIList.push(WebauthnPreBuiltUI);
    }

    if (emailVerificationMode !== "OFF") {
        recipePreBuiltUIList.push(EmailVerificationPreBuiltUI);
    }

    const [, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", onLocationChange);
    }, [setCurrentPath]);

    if (canHandleRoute(recipePreBuiltUIList)) {
        return <BaseComponent>{getRoutingComponent(recipePreBuiltUIList)}</BaseComponent>;
    }

    // Custom router...

    return (
        <BaseComponent>
            <Home />
        </BaseComponent>
    );
}

function Nav() {
    return (
        <div className="header__menu menu">
            <div className="menu__icon icon-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className="menu__body">
                <ul className="menu__list">
                    <li>
                        <a className="menu__link" href="/home?router=no-router">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="menu__link" href="/auth?router=no-router">
                            Auth
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
export default AppWithoutRouter;
