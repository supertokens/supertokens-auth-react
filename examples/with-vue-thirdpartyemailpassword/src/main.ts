import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";

import App from "./App.vue";
import router from "./router";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo",
        apiDomain: "http://localhost:3001",
    },
    recipeList: [Session.init()],
});

Vue.use(VueCompositionAPI);

const app = createApp({
    router,
    render: () => h(App),
});

app.mount("#app");
