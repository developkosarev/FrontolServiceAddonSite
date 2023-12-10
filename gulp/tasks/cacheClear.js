cache = require('gulp-cache');

module.exports = function (cb) {
    cache.clearAll()
    cb()
}