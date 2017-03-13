const fs = require("fs");
const browserify = require("browserify");

function pack(input, output, opt) {
    var bundler = browserify(input, opt);
    opt.basedir = opt.basedir || process.cwd();
    // Parse externals
    if (opt.external) {
        bundler.external(opt.external);
    }
    // Parse require
    if (opt.require) {
        opt.require.forEach(r => bundler.require.apply(bundler, r));
    }
    // By default using uglifyify when in production environment
    if (process.env.NODE_ENV === 'production') {
        console.log('production');
        bundler.transform('uglifyify', { global: true });
    }

    if (output) {
        return bundler.bundle().pipe(fs.createWriteStream(output));
    }
    else {
        return bundler.bundle();
    }
}

pack.forHarmony = {
    transform: [
        ['babelify', {
            presets: ["env", "react"],
            plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
        }]
    ]
};

pack.forNodejs = {
    builtins: false,
    commondir: false,
    browserField: false,
    insertGlobalVars: {
        'process': undefined
    }
};

module.exports = pack;
