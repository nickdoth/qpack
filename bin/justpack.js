#!/usr/bin/env node
const program = require('commander');
const qpack = require('..');
const fs = require('fs');
const cwd = process.cwd();

program
    .arguments('<entry> <dest> [alts]')
    .description('for node.js')
    .action(function(entry, dest, alts) {
        if (alts) {
            let rc = `${cwd}/pack.${alts}.js`;
            if (fs.existsSync(rc)) {
                return qpack(entry, dest, require(rc));
            }
            else if (qpack[alts]) {
                return qpack(entry, dest, qpack[alts]);
            }
        }
        else {
            qpack(entry, dest);
        }
    })
    .parse(process.argv);