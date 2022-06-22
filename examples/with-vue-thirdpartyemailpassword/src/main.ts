import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import * as SuperTokens from "supertokens-website";

import App from "./App.vue";
import router from "./router";

SuperTokens.init({
    apiDomain: "http://localhost:3001",
});

Vue.use(VueCompositionAPI);

const app = createApp({
    router,
    render: () => h(App),
});

app.mount("#app");
