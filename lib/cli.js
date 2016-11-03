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
    }, function() {
        updateNotifier({ pkg }).notify();
    });
}
