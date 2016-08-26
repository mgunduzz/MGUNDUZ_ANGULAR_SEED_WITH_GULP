var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var wiredep = require('wiredep').stream;
var cleanCSS = require('gulp-clean-css');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');


var paths = {
    root: 'src',
    app: 'src/app',
    app_js: 'src/app/**/*.js',
    app_css: 'src/app/**/*.css',
    app_sass: 'src/app/**/*.scss',
    app_html: 'src/app/**/*.html',
    bower_components: 'src/app/bower_components',
    index: 'src/index.html',
    index_root: 'src',
    libs: 'libs',
    tmp: 'src/tmp/',
    app_css_file: 'src/app/app.scss',
    tmp_css_root: 'src/tmp/css',
    tmp_css_file: 'src/tmp/css/tmp.css'
};


// Static server

gulp.task('run',[], function() {
    browserSync.init({
        server: {
            baseDir: paths.root
        },
        port:3010
    });
});


gulp.task('watch', [] , function() {
    gulp.watch(paths.app_sass, ['sass']);
    gulp.watch(paths.app_html).on('change', browserSync.reload);
    gulp.watch(paths.app_js).on('change', browserSync.reload);
    gulp.watch(paths.index).on('change', browserSync.reload);
});

gulp.task('default', ['bower', 'js', 'sass','run', 'watch'], function () {
    //
});


///////////////////////////////////
////// BOWER JS AND CSS İNJECT
///////////////////////////////////

gulp.task('bower', function () {
    gulp.src(paths.index)
      .pipe(wiredep({
          optional: 'configuration',
          goes: 'here'
      }))
      .pipe(gulp.dest(paths.index_root));
});

///////////////////////////////////
////// CUSTOM JS INJECT
///////////////////////////////////

gulp.task('js', ['js-inject']);

gulp.task('js-inject', function () {
    gulp.src(paths.index)    
        .pipe(debug())
        .pipe(inject(gulp.src([paths.app_js]).pipe(angularFilesort()), { relative: true }))
        .pipe(gulp.dest(paths.index_root));
});

///////////////////////////////////
////// SASS
///////////////////////////////////

gulp.task('sass-concat', function () {
    return gulp.src([paths.app_css_file, paths.app_sass])
        .pipe(sass())
        .pipe(concat('tmp.css'))
        .pipe(gulp.dest(paths.tmp_css_root))
        .pipe(browserSync.stream());
});

gulp.task('sass-inject', ['sass-concat'], function () {
    gulp.src(paths.index)
      .pipe(inject(gulp.src([paths.tmp_css_file], { read: false }), { relative: true }))
      .pipe(gulp.dest(paths.index_root));
});

gulp.task('sass', ['sass-inject']);
