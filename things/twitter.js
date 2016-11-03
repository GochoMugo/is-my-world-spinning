/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 */


// npm-installed modules
const cheerio = require("cheerio");
const request = require("superagent");


// module variables
const url = "https://status.twitterstat.us";


exports.name = "twitter";
exports.status = function status(opts, done) {
    return request
        .get(url)
        .end(function(getError, res) {
            if (getError) return done(getError);
            const $ = cheerio.load(res.text);
            const status = $(".component-status").text().toLowerCase();

            switch (status) {
            case "operational":
                return done(null, opts.constants.status.good);
            case "partial service disruption":
            default:
                return done(null, opts.constants.status.bad);
            }
            return done(new Error("unexpected response"));
        });
};
