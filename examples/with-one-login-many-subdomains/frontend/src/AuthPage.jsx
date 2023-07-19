import { useState } from "react";
import * as reactRouterDom from "react-router-dom";
import { Routes } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/lib/build/index2";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";

export const AuthPage = () => {
    const [inputTenantId, setInputTenantId] = useState("");
    const tenantId = localStorage.getItem("tenantId") ?? undefined;

    if (tenantId !== undefined) {
        return (
            <Routes>
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
                    ThirdPartyEmailPasswordPreBuiltUI,
                    ThirdPartyPasswordlessPreBuiltUI,
                ])}
            </Routes>
        );
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
