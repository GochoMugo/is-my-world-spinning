/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 *
 * CLI.
 */


exports = module.exports = {
    run,
};


// npm-installed modules
const program = require("commander");
const updateNotifier = require("update-notifier");


// own modules
const main = require("./main");
const pkg = require("../package.json");


program
    .version(pkg.version)
    .option("-f, --filter <things>", "comma-separated list of things to check e.g. github,npm")
    ;


function run() {
    program.parse(process.argv);

    return main({
        ui: true,
        filter: program.filter ? program.filter.split(",") : null,
    }, function(error, statuses, data) {
        updateNotifier({ pkg }).notify();
        if (error) {
            return process.exit(3);
        }

        let ret = 0;

        for (let name in statuses) {
            switch (statuses[name]) {
            case data.constants.status.bad:
                if (ret < 1) ret = 1;
                break;
            case data.constants.status.errored:
                if (ret < 2) ret = 2;
                break;
            }
        }

        process.exit(ret);
    });
}
