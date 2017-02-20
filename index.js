var fs = require("fs");
var browserify = require("browserify");

function pack(input, output, opt) {
    var bundle = browserify(input, opt)
        .transform("babelify", {
            presets: ["latest", "react"],
            plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
        })
        .bundle()

    if (output) {
        return bundle.pipe(fs.createWriteStream(output));
    }
    else {
        return bundle;
    }
}

pack.forNodejs = function(input, output) {
    return pack(input, output, {
        builtins: false,
        commondir: false,
        browserField: false,
        insertGlobalVars: {
            'process': undefined
        }
    });
}

module.exports = pack;
