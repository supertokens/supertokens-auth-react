<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import { beforeUpdate } from "svelte";
    import React from "react";
    import ReactDOM from "react-dom";
    import SuperTokens from "supertokens-auth-react";
    import ThirdPartyEmailPassword, { Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
    import Session from "supertokens-auth-react/recipe/session";
    import { Router, Route } from "svelte-navigator";

    let container: ReactDOM.Container;

    SuperTokens.init({
        appInfo: {
            appName: "SuperTokens Demo App", // TODO: Your app name
            apiDomain: "http://localhost:4000", // TODO: Change to your app's API domain
            websiteDomain: "http://localhost:8080", // TODO: Change to your app's website domain
        },
        recipeList: [
            ThirdPartyEmailPassword.init({
                signInAndUpFeature: {
                    providers: [Github.init(), Google.init()],
                },
            }),
            Session.init(),
        ],
    });
    beforeUpdate(() => {
        class Sp extends React.Component {
            render() {
                if (SuperTokens.canHandleRoute()) {
                    return SuperTokens.getRoutingComponent();
                }
            }
        }
        container = document.getElementById("root");
        ReactDOM.render(React.createElement(Sp), container);
    });

    export let name: string;
</script>

<Router>
    <Route path="/">
        <Navbar />
        <div>
            <h1>Hello {name}!</h1>
            <p>
                Visit the <a href="https://supertokens.com">SuperTokens tutorial</a> to learn how to build Auth under a day.
            </p>
            <p>
                Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.
            </p>
        </div>
    </Route>
    <Route path="/auth">
        <div bind:this={container} />
    </Route>
</Router>

<style>
    div {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
