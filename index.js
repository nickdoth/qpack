var fs = require("fs");
var browserify = require("browserify");

module.exports = function pack(input, output, opt) {
    var bundle = browserify(input, opt)
        .transform("babelify", {presets: ["latest", "react"]})
        .bundle()

    if (output) {
        return bundle.pipe(fs.createWriteStream(output));
    }
    else {
        return bundle;
    }
}
