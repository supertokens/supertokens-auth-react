"use strict";

const app = require("./netlify/functions/api").app;

app.listen(8889, () => console.log("Local app listening on port 8889!"));
