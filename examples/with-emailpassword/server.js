const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");

const app = express();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

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
