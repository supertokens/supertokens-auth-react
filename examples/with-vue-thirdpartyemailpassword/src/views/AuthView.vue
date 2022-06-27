<script lang="ts">
import * as React from "react";
import * as ReactDOM from "react-dom";
import SuperTokensReactComponent from "../components/Supertokens";

export default {
    mounted() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById("authId"));
    },
    beforeDestroy() {
        ReactDOM.unmountComponentAtNode(document.getElementById("authId") as Element);
    },
};
</script>

<template>
    <main>
        <div id="authId" />
    </main>
</template>
