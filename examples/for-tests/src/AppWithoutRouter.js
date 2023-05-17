import React, { useEffect, useState } from "react";
import { BaseComponent, Home, getQueryParams } from "./App";
import { getRoutingComponent, canHandleRoute } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

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
const authRecipe = window.localStorage.getItem("authRecipe") || getQueryParams("authRecipe") || "emailpassword";
const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

let recipePreBuiltUIList = [EmailPasswordPreBuiltUI];
if (authRecipe === "thirdparty") {
    recipePreBuiltUIList = [ThirdPartyPreBuiltUI];
} else if (authRecipe === "emailpassword") {
    recipePreBuiltUIList = [EmailPasswordPreBuiltUI];
} else if (authRecipe === "both") {
    recipePreBuiltUIList = [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI];
} else if (authRecipe === "thirdpartyemailpassword") {
    recipePreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI];
} else if (authRecipe === "passwordless") {
    recipePreBuiltUIList = [PasswordlessPreBuiltUI];
} else if (authRecipe === "thirdpartypasswordless") {
    recipePreBuiltUIList = [ThirdPartyPasswordlessPreBuiltUI];
}

if (emailVerificationMode !== "OFF") {
    recipePreBuiltUIList.push(EmailVerificationPreBuiltUI);
}

function Routing() {
    const authRecipe = window.localStorage.getItem("authRecipe") || "emailpassword";
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

    let recipePreBuiltUIList = [EmailPasswordPreBuiltUI];
    if (authRecipe === "thirdparty") {
        recipePreBuiltUIList = [ThirdPartyPreBuiltUI];
    } else if (authRecipe === "emailpassword") {
        recipePreBuiltUIList = [EmailPasswordPreBuiltUI];
    } else if (authRecipe === "both") {
        recipePreBuiltUIList = [EmailPasswordPreBuiltUI, ThirdPartyPreBuiltUI];
    } else if (authRecipe === "thirdpartyemailpassword") {
        recipePreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI];
    } else if (authRecipe === "passwordless") {
        recipePreBuiltUIList = [PasswordlessPreBuiltUI];
    } else if (authRecipe === "thirdpartypasswordless") {
        recipePreBuiltUIList = [ThirdPartyPasswordlessPreBuiltUI];
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
