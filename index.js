var fs = require("fs");
var browserify = require("browserify");

module.exports = function pack(input, output) {
    return browserify(input)
        .transform("babelify", {presets: ["latest", "react"]})
        .bundle()
        .pipe(fs.createWriteStream(output));
}