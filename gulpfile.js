'use strict';

const path = require('./gulp/path');
const config = require('./gulp/config');
const versionConfig = require('./gulp/versionConfig');
const webpackConfig = require('./gulp/webpackConfig');
const purgecssConfig = require('./gulp/purgecssConfig');

const webpack = require('webpack-stream');
const gulp = require('gulp');

var webserver = require('browser-sync'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),    
	sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    sriHash = require('gulp-sri-hash'),
    version = require('gulp-version-number'),
    purgecss = require('gulp-purgecss');

/* tasks */

// start server
gulp.task('webserver', function () {
    webserver(config);
});

// html
gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(version(versionConfig))
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({ stream: true }));
});

// sri
gulp.task('html:sri', function () {
    return gulp.src(path.build.sri)
        .pipe(sriHash())
        .pipe(gulp.dest(path.build.html));        
});

// style
gulp.task('css:build', function () {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))        
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({ stream: true }));
});

// clear styles
gulp.task('css:purgecss', () => {
    return gulp.src(path.build.css + '*.css')        
        .pipe(purgecss(purgecssConfig))        
        .pipe(gulp.dest('assets/build/css-purge'))
})

// js
gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({ stream: true }));
});

// js-webpack
gulp.task('js-webpack:build', function() {
    return gulp.src(path.src.indexjs)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(path.build.js));
});

// fonts
gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// txt
gulp.task('txt:build', function () {
    return gulp.src(path.src.txt)
        .pipe(gulp.dest(path.build.txt));
});

// img
gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(cache(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
        .pipe(gulp.dest(path.build.img));
});

// clean build 
gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        .pipe(rimraf());
});

// cache clear
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// build
gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'js:build',
            'js-webpack:build',
            'fonts:build',
			'txt:build',
            'image:build'
        )        
    )
);

// watch
gulp.task('watch', function () {    
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.js, gulp.series('js-webpack:build'));    
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    gulp.watch(path.watch.html, gulp.series('html:build'));
});

// default
gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver','watch')      
));
