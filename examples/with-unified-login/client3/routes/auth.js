var express = require("express");
var clients = require("../clients.json");
var passport = require("passport");
var OpenIDConnectStrategy = require("passport-openidconnect");

const tenantId = "tenant3";
const clientId = clients[tenantId].clientId;
const clientSecret = clients[tenantId].clientSecret;

passport.use(
    new OpenIDConnectStrategy(
        {
            issuer: `http://localhost:3001/auth`,
            authorizationURL: "http://localhost:3001/auth/oauth/auth",
            tokenURL: "http://localhost:3001/auth/oauth/token",
            userInfoURL: "http://localhost:3001/auth/oauth/userinfo",
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: "http://localhost:3013/oauth2/redirect",
            scope: ["profile"],
        },
        function verify(issuer, profile, cb) {
            return cb(null, profile);
        }
    )
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.displayName });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

var router = express.Router();

router.get("/login", passport.authenticate("openidconnect"));

router.get(
    "/oauth2/redirect",
    passport.authenticate("openidconnect", {
        successReturnToOrRedirect: "/",
        failureRedirect: "/login",
    })
);

router.post("/logout", function (req, res, next) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
