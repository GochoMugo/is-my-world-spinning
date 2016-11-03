/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 */


exports = module.exports = main;


// built-in modules
const path = require("path");


// npm-installed modules
const chalk = require("chalk");
const logUpdate = require("log-update");
const requireAll = require("require-all");
const unicons = require("unicons");


// module variables
const thingsPath = path.join(__dirname, "../things");
const things = requireAll(thingsPath);
const constants = {
    status: {
        waiting: 0,
        good: 1,
        moderate: 2,
        bad: 3,
        errored: 4,
    },
};


function main(options, done) {
    if (!done) {
        done = options;
        options = {};
    }

    const opts = Object.assign({
        ui: false,
        filter: null,
    }, options);
    const statuses = {};
    const counters = { waiting: 0 };

    Object.keys(things).forEach(function(key) {
        const thing = things[key];

        if (opts.filter && opts.filter.indexOf(thing.name) < 0) {
            return;
        }

        statuses[thing.name] = constants.status.waiting;
        counters.waiting++;
        return thing.status({ constants }, function(error, status) {
            counters.waiting--;
            if (error) {
                statuses[thing.name] = constants.status.errored;
            } else {
                statuses[thing.name] = status;
            }
            log();
            if (counters.waiting === 0) done(null, statuses, { constants });
        });
    });

    function log() {
        if (!opts.ui) return;

        const header = "\n  This is how the world looks like right now!\n\n";
        const statusOutput = Object.keys(statuses).sort().map(function(key) {
            const status = statuses[key];
            let icon;
            let text = chalk.bold(key);

            switch (status) {
            case constants.status.waiting:
                icon = chalk.gray(unicons.circle);
                break;
            case constants.status.good:
                icon = chalk.green(unicons.check);
                break;
            case constants.status.moderate:
                icon = chalk.blue(unicons.circle);
                break;
            case constants.status.bad:
                icon = chalk.red(unicons.cross);
                break;
            case constants.status.errored:
                icon = chalk.red(unicons.cross);
                text += " " + chalk.gray("status check failed!");
                break;
            }

            return "\t" + icon + " " + text;
        }).join("\n");

        return logUpdate(header + statusOutput);
    }
}
