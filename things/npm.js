/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 */


// own modules
const statuspage = require("../utils/statuspage");


exports.name = "npm";
exports.status = statuspage.for("https://wyvgptkd90hm.statuspage.io/api/v2/status.json");
