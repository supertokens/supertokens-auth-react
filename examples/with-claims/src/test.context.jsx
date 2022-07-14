import { useState } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { EmailVerifiedClaim } from "supertokens-auth-react/recipe/emailverification";

import { getApiDomain } from "./App";

const TestContext = createContext({
    logs: [],
    api: undefined,
    addLogItem: () => {},
});

export const useTestApi = () => {
    return useContext(TestContext).api;
};

export const useTestLogs = () => {
    return useContext(TestContext).logs;
};

export const useTestLogger = () => {
    return useContext(TestContext).addLogItem;
};

export const TestContextProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);

    const addLogItem = useCallback(
        (item) => {
            setLogs((o) => o.concat([item]));
        },
        [setLogs]
    );

    const loggedApi = useMemo(() => {
        return {
            async verifyEmail(userId, unverify) {
                await post("/verify-email", {
                    userId,
                    unverify,
                });
            },
            async setRoles(userId, roles) {
                await post("/set-roles", {
                    roles,
                    userId,
                });
            },
            async secondFactorAuth() {
                await post("/second-factor");
            },
            refreshRolesInToken() {
                return post("/refresh-roles");
            },
            refreshEmailVerifiedInToken() {
                return EmailVerifiedClaim.refresh();
            },
            getUserInfo() {
                return get("/get-user-info");
            },
            api1() {
                return get("/api1", []);
            },
            api2() {
                return get("/api2", []);
            },
        };

        async function post(path, body) {
            const caller = new Error().stack.split("\n")[3].replace(/.*at (\w+\.?\w+).*/, "$1");

            addLogItem(`POST ${path} body: ${JSON.stringify(body)} caller: ${caller}`);

            const res = await fetch(getApiDomain() + path, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            addLogItem(`POST ${path} ${res.status}`);
            return res;
        }

        async function get(path, params) {
            const finalPath =
                params.length > 0
                    ? path + "?" + params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")
                    : path;
            addLogItem("GET " + finalPath);
            const res = await fetch(getApiDomain() + finalPath, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            addLogItem(`GET ${finalPath} ${res.status}`);
            return res;
        }
    }, [addLogItem]);

    // This is awful, terrible and hacky... but also fine for testing
    Object.assign(api, loggedApi);
    api.addLogItem = addLogItem;

    return (
        <SessionAuth
            requireAuth={false}
            overrideGlobalClaimValidators={() => []}
            onSessionExpired={() => addLogItem("SESSION_EXPIRED")}>
            <TestContext.Provider
                value={{
                    logs,
                    api: loggedApi,
                    addLogItem,
                }}>
                {children}
            </TestContext.Provider>
        </SessionAuth>
    );
};

export const api = {};
