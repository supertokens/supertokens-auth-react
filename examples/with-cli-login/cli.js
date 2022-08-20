let axios = require("axios");
var url = require("url");

async function startLogin() {
    let resp = await axios("http://localhost:3001/getmagiclink");
    let magicLink = await resp.data;
    console.log("Please use the following link to login:");
    console.log(magicLink);
    console.log();
    console.log("Waiting for you to login...");
    console.log();

    let url_parts = url.parse(magicLink, true);
    let preAuthSessionId = url_parts.query.preAuthSessionId;
    let jwt = await waitForLogin(preAuthSessionId);

    console.log("Login success! The CLI has a JWT:");
    console.log(jwt);
}

async function waitForLogin(preAuthSessionId) {
    let resp = await axios.post("http://localhost:3001/waitforlogin", {
        preAuthSessionId,
    });
    if (resp.data === "Not consumed. Try again in sometime") {
        return await new Promise((r) => {
            setTimeout(async () => {
                r(await waitForLogin(preAuthSessionId));
            }, 1000);
        });
    } else {
        return resp.data;
    }
}

startLogin();
