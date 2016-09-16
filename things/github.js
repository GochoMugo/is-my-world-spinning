/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 */


// npm-installed modules
const request = require("superagent");


exports.name = "github";
exports.status = function status(opts, done) {
    return request
        .get("https://status.github.com/api/status.json")
        .end(function(getError, res) {
            if (getError) return done(getError);
            switch (res.body.status) {
            case "good":
                return done(null, opts.constants.status.good);
            case "minor":
                return done(null, opts.constants.status.moderate);
            case "major":
                return done(null, opts.constants.status.bad);
            }
            return done(new Error("unexpected response"));
        });
};
