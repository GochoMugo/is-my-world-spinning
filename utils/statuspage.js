/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 */


// npm-installed modules
const request = require("superagent");


/**
 * Return a 'status' function that can be invoked to fetch the status
 * of a service using statuspage.io. The appropriate url should
 * be found at 'https://<status-page-url.com>/api'.
 *
 * @param  {String} url
 * @return {Function} status(opts, done)
 */
exports.for = function(url) {
    return function(opts, done) {
        return request
            .get(url)
            .end(function(getError, res) {
                if (getError) return done(getError);
                switch (res.body.status.indicator) {
                case "none":
                    return done(null, opts.constants.status.good);
                case "minor":
                    return done(null, opts.constants.status.moderate);
                case "major":
                case "critical":
                    return done(null, opts.constants.status.bad);
                }
                return done(new Error("unexpected response"));
            });
    };
};
