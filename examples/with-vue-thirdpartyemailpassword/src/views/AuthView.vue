<script lang="ts">
import * as React from "react";
import * as ReactDOM from "react-dom";
import SuperTokensReactComponent from "../components/Supertokens";

export default {
    beforeMount() {
        this.render();
    },
    beforeUpdate() {
        this.render();
    },
    mounted() {
        this.render();
    },
    beforeDestroy() {
        ReactDOM.unmountComponentAtNode(document.getElementById("app") as Element);
    },
    methods: {
        render() {
            ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById("app"));
        },
    },
};
</script>

<template>
    <main>
        <h1>Auth</h1>
    </main>
</template>
