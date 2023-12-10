const { src, dest } = require('gulp');
const purgecss = require('gulp-purgecss');
const purgecssConfig = require('../config/purgecssConfig');
const path = require('../config/path');

module.exports = function () {
    return src(path.build.css + '*.css')        
        .pipe(purgecss(purgecssConfig))        
        .pipe(dest(path.build.csspurge))
}