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
    ;


function run() {
    program.parse(process.argv);

    return main({ ui: true }, function() {
        updateNotifier({ pkg }).notify();
    });
}
