const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");

const app = express();

const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;

app.use(morgan("dev"));
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(express.static(join(__dirname, "build")));

app.use("*", (req, res) => {
    res.sendFile(join(__dirname, "build/index.html"));
});

app.listen(websitePort, () => console.log(`Server listening on port ${websitePort}`));
