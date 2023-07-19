import fetch from "cross-fetch";

async function setupTenant(appId, tenantId, loginMethods) {
    let coreResp = await fetch(`http://localhost:3567/appid-${appId}/recipe/multitenancy/tenant`, {
        method: "PUT",
        headers: [
            ["content-type", "application/json"],
            ["rid", "multitenancy"],
        ],
        body: JSON.stringify({
            tenantId,
            emailPasswordEnabled: loginMethods.emailPassword?.enabled === true,
            thirdPartyEnabled: loginMethods.thirdParty?.enabled === true,
            passwordlessEnabled: loginMethods.passwordless?.enabled === true,
            coreConfig: {},
        }),
    });

    if (coreResp.status !== 200) {
        throw new Error(await coreResp.text());
    }

    for (const providerConfig of loginMethods["thirdParty"]?.providers) {
        coreResp = await fetch(
            `http://localhost:3567/appid-${appId}/${tenantId}/recipe/multitenancy/config/thirdparty`,
            {
                method: "PUT",
                headers: [
                    ["content-type", "application/json"],
                    ["rid", "multitenancy"],
                ],
                body: JSON.stringify({
                    config: providerConfig,
                }),
            }
        );

        if (coreResp.status !== 200) {
            throw new Error(await coreResp.text());
        }
    }
}

async function main() {
    await setupTenant("public", "tenant1", {
        emailPassword: { enabled: true },
        passwordless: { enabled: false },
        thirdParty: {
            enabled: true,
            providers: [
                {
                    thirdPartyId: "google",
                    name: "Google cust",
                    clients: [
                        {
                            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                            clientSecret: "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",
                        },
                    ],
                },
            ],
        },
    });
    await setupTenant("public", "tenant2", {
        emailPassword: { enabled: true },
        passwordless: { enabled: false },
        thirdParty: {
            enabled: false,
            providers: [],
        },
    });
    await setupTenant("public", "tenant3", {
        emailPassword: { enabled: true },
        passwordless: { enabled: false },
        thirdParty: {
            enabled: true,
            providers: [
                {
                    thirdPartyId: "github",
                    name: "GitHub",
                    clients: [
                        {
                            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                            clientId: "467101b197249757c71f",
                        },
                    ],
                },
            ],
        },
    });

    console.log("successful setup");
}

main().catch(console.error);
