<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import React from "react";
    import ReactDOM from "react-dom";
    import SuperTokens from "supertokens-auth-react";
    import ThirdPartyEmailPassword, {
        Github,
        Google,
        signOut,
    } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
    import Session from "supertokens-auth-react/recipe/session";
    import { Router, Route } from "svelte-navigator";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";

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

    class SuperTokensComponent extends React.Component {
        render() {
            if (SuperTokens.canHandleRoute()) {
                return SuperTokens.getRoutingComponent();
            }
            return "Route not found";
        }
    }

    function onLoadSuperTokens(element: any) {
        ReactDOM.render(React.createElement(SuperTokensComponent), element);
    }

    let userId: string;
    let session: boolean;

    async function getUserInfo() {
        session = await Session.doesSessionExist();
        if (await Session.doesSessionExist()) {
            userId = await Session.getUserId();
        }
    }

    async function onLogout() {
        await signOut();
        window.location.reload();
    }

    onMount(getUserInfo);
</script>

<Router>
    <Route path="/">
        <Navbar />
        <div class="body">
            <h1>Hello👋</h1>
            {#if session}
                <div class="user">
                    <span>UserId:</span>
                    <h3>{userId}</h3>
                </div>
            {/if}
            <p>
                Visit the <a href="https://supertokens.com">SuperTokens tutorial</a> to learn how to build Auth under a day.
            </p>
            <p>
                Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.
            </p>
            {#if session}
                <button on:click={onLogout}>Logout</button>
            {/if}
            {#if !session}
                <button>
                    <Link to="/auth" style="color: inherit; text-decoration: none;">Signup</Link>
                </button>
            {/if}
        </div>
    </Route>
    <Route path="/auth/*" primary={false}>
        <div id="supertokens-app-root" use:onLoadSuperTokens />
    </Route>
</Router>

<style>
    .body {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .user {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        padding: 0.1rem;
    }

    span {
        margin-right: 0.3rem;
        font-size: large;
    }

    h3 {
        color: #ff3e00;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    button {
        cursor: pointer;
        background-color: #ffb399;
        border: none;
        color: rgb(82, 82, 82);
        padding: 0.75rem;
        margin: 2rem;
        transition: all 0.5s ease-in-out;
        border-radius: 2rem;
        width: 10%;
        font-size: large;
    }
    button:hover {
        transform: scale(1.1);
        background-color: #ff3e00;
        color: white;
    }
</style>
