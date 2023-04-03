import React, { useEffect, useState } from "react";
import { BaseComponent, Home } from "./App";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

const authRecipe = window.localStorage.getItem("authRecipe") || "emailpassword";

let recipePreBuiltUI = EmailPasswordPreBuiltUI;
if (authRecipe === "thirdparty") {
    recipePreBuiltUI = ThirdPartyPreBuiltUI;
} else if (authRecipe === "emailpassword") {
    recipePreBuiltUI = EmailPasswordPreBuiltUI;
} else if (authRecipe === "both") {
    recipePreBuiltUI = {
        canHandleRoute: () => {
            return ThirdPartyPreBuiltUI.canHandleRoute() && EmailPasswordPreBuiltUI.canHandleRoute();
        },
        getRoutingComponent: () => {
            return (
                <>
                    {EmailPasswordPreBuiltUI.getRoutingComponent()}
                    {ThirdPartyPreBuiltUI.getRoutingComponent()}
                </>
            );
        },
    };
} else if (authRecipe === "thirdpartyemailpassword") {
    recipePreBuiltUI = ThirdPartyEmailPasswordPreBuiltUI;
} else if (authRecipe === "passwordless") {
    recipePreBuiltUI = PasswordlessPreBuiltUI;
} else if (authRecipe === "thirdpartypasswordless") {
    recipePreBuiltUI = ThirdPartyPasswordlessPreBuiltUI;
}

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
    const [, setCurrentPath] = useState(window.location.pathname);
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", onLocationChange);
    }, [setCurrentPath]);

    if (emailVerificationMode !== "OFF" && EmailVerificationPreBuiltUI.canHandleRoute()) {
        return EmailVerificationPreBuiltUI.getRoutingComponent();
    }

    if (recipePreBuiltUI.canHandleRoute()) {
        return <BaseComponent>{recipePreBuiltUI.getRoutingComponent()}</BaseComponent>;
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
