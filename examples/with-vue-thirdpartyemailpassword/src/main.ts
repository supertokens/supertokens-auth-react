import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";

import App from "./App.vue";
import router from "./router";
import EmailVerification, { EmailVerificationClaim } from "supertokens-web-js/recipe/emailverification";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo",
        apiDomain: "http://localhost:3001",
    },
    recipeList: [
        EmailVerification.init(),
        Session.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: ({ claimValidatorsAddedByOtherRecipes }) => [
                        ...claimValidatorsAddedByOtherRecipes,
                        EmailVerificationClaim.validators.isVerified(),
                    ],
                }),
            },
        }),
    ],
});

Vue.use(VueCompositionAPI);

const app = createApp({
    router,
    render: () => h(App),
});

app.mount("#app");
