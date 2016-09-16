/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 */


// own modules
const statuspage = require("../utils/statuspage");


exports.name = "bitbucket";
exports.status = statuspage.for("https://bqlf8qjztdtr.statuspage.io/api/v2/status.json");
