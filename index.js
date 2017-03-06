var fs = require("fs");
var browserify = require("browserify");

function pack(input, output, opt) {
    var bundle = browserify(input, opt)
        .transform('babelify', {
            presets: ["env", "react"],
            plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
        });
    if (process.env.NODE_ENV === 'production') {
        console.log('production');
        bundle.transform('uglifyify', { global: true });
    }

    if (output) {
        return bundle.bundle().pipe(fs.createWriteStream(output));
    }
    else {
        return bundle.bundle();
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
