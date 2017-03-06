const program = require('commander');
const qpack = require('..');

program
    .arguments('<entry> <dest> [alts]')
    .description('for node.js')
    .action(function(entry, dest, alts) {
        if (alts && qpack[alts]) {
            return qpack[alts](entry, dest);
        }
        else {
            qpack(entry, dest);
        }
    })
    .parse(process.argv);