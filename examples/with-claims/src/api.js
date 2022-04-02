import { getApiDomain } from "./App";

export const api = {
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
        return post("/refresh-email-verified");
    },
    getUserInfo() {
        return get("/get-user-info");
    },
    api1() {
        return get("/api1");
    },
    api2() {
        return get("/api2");
    },
};

async function post(path, body) {
    await fetch(getApiDomain() + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

async function get(path, params) {
    await fetch(
        getApiDomain() +
            [path, params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")].join("?"),
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );
}
