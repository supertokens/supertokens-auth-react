<script lang="ts">
import * as React from "react";
import * as ReactDOM from "react-dom";
import SuperTokensReactComponent from "../components/Supertokens";

export default {
    mounted() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById("app"));
    },
    beforeDestroy() {
        ReactDOM.unmountComponentAtNode(document.getElementById("app") as Element);
    },
};
</script>

<template>
    <main>
        <h1>Auth</h1>
    </main>
</template>
