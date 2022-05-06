<script>
    import { Link } from "svelte-navigator";
    import Session from "supertokens-auth-react/recipe/session";
    import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
    import { onMount } from "svelte";

    let sess;

    const getUserInfo = async () => {
        sess = await Session.doesSessionExist();
    };

    async function onLogout() {
        await signOut();
        window.location.href = "/";
        getUserInfo();
    }

    onMount(() => {
        getUserInfo();
    });
</script>

<div>
    <p>SuperTokens</p>
    {#if !sess}
        <button>
            <Link to="/auth">Signup</Link>
        </button>
    {/if}
    {#if sess}
        <button on:click={onLogout}> Logout </button>
    {/if}
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
        position: fixed;
        align-items: baseline;
        top: 0;
        left: 0;
        right: 0;
        background-color: #fac2af;
    }
    button {
        margin: 1rem;
        font-size: large;
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: all 0.2s;
        color: rgb(94, 94, 94);
    }
    button:hover {
        color: #ff3e00;
    }
    p {
        margin: 1rem;
        font-size: large;
        color: rgb(94, 94, 94);
    }
</style>
