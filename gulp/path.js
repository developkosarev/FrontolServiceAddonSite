module.exports = {
    build: {
        html: 'assets/build/',
        sri: 'assets/build/*.html',
        js: 'assets/build/js/',
        css: 'assets/build/css/',
        img: 'assets/build/img/',
        fonts: 'assets/build/fonts/',
		txt: 'assets/build/'
    },
    src: {
        html: 'assets/src/*.html',        
        js: 'assets/src/js/main.js',
        indexjs: 'assets/src/js/index.js',
        style: 'assets/src/style/main.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/src/fonts/**/*.*',
		txt: 'assets/src/*.txt'
    },
    watch: {
        html: 'assets/src/**/*.html',
        js: 'assets/src/js/**/*.js',
        css: 'assets/src/style/**/*.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/srs/fonts/**/*.*'
    },
    clean: './assets/build/*'
};