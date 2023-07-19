import { useState } from "react";
import * as reactRouterDom from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/lib/build/index2";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { getRoutingComponent } from "supertokens-auth-react/ui";
import { clearTenantId } from "./utils";

export const AuthPage = () => {
    // This also triggers re-rendering when react-router-dom navigates
    const location = reactRouterDom.useLocation();

    const queryTenantId = new URLSearchParams(location.search).get("tenantId");
    if (queryTenantId === "") {
        clearTenantId();
    } else if (queryTenantId !== null) {
        localStorage.setItem("tenantId", queryTenantId);
    }

    const [inputTenantId, setInputTenantId] = useState(undefined);
    const tenantId = localStorage.getItem("tenantId") ?? undefined;

    if (tenantId !== undefined) {
        // We call the react router dom version as well, to "register" that the SDK can use it for navigation
        // This can be skipped, but that means that the SDK will use full page navigation for redirection
        getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
            ThirdPartyEmailPasswordPreBuiltUI,
            ThirdPartyPasswordlessPreBuiltUI,
        ]);
        return getRoutingComponent([ThirdPartyEmailPasswordPreBuiltUI, ThirdPartyPasswordlessPreBuiltUI]);
    } else {
        return (
            <form
                className="tenantForm"
                onSubmit={() => {
                    // this value will be read by SuperTokens as shown in the next steps.
                    localStorage.setItem("tenantId", inputTenantId);
                    window.location.reload();
                }}>
                <h2>Enter your organisation's name:</h2>
                <input type="text" value={inputTenantId} onChange={(e) => setInputTenantId(e.target.value)} />
                <br />
                <button type="submit">Next</button>
            </form>
        );
    }
};
