<script lang="ts">
import * as Session from "supertokens-web-js/recipe/session";

export default {
    data() {
        return {
            session: false,
            userId: "",
        };
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        redirectToLogin() {
            window.location.href = "/auth";
        },
        async getUserInfo() {
            this.session = await Session.doesSessionExist();
            if (this.session) {
                this.userId = await Session.getUserId();
            }
        },
        async onLogout() {
            await Session.signOut();
            window.location.reload();
        },
    },
};
</script>

<template>
    <main>
        <div class="body">
            <h1>Hello</h1>

            <div v-if="session">
                <span>UserId:</span>
                <h3>{{ userId }}</h3>

                <button @click="onLogout">Sign Out</button>
            </div>
            <div v-else>
                <p>
                    Visit the <a href="https://supertokens.com">SuperTokens tutorial</a> to learn how to build Auth
                    under a day.
                </p>
                <button @click="redirectToLogin">Sign in</button>
            </div>
        </div>
    </main>
</template>

<style scoped>
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
    font-size: large;
}
button:hover {
    transform: scale(1.1);
    background-color: #ff3e00;
    color: white;
}
</style>
