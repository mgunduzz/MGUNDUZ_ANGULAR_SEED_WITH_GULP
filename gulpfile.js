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
    root: 'app',
    src: 'app/src',
    src_js: 'app/src/**/*.js',
    src_css: 'app/src/**/*.css',
    src_sass: 'app/src/**/*.scss',
    src_html: 'app/src/**/*.html',
    bower_components: 'app/bower_components',
    index: 'app/index.html',
    libs: 'libs',
    tmp: 'app/tmp/',
    tmp_css_root: 'app/tmp/css',
    app_css_file: 'app/app.scss',
    tmp_css_file: 'app/tmp/css/tmp.css'
};


// Static server
gulp.task('default', ['bower', 'js', 'sass'], function () {
    browserSync.init({
        server: {
            baseDir: paths.root
        }
    });

    gulp.watch(paths.src_sass, ['sass']);
    gulp.watch(paths.src_html).on('change', browserSync.reload);
    gulp.watch(paths.index).on('change', browserSync.reload);
    gulp.watch(paths.src_js).on('change', browserSync.reload);
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
      .pipe(gulp.dest(paths.root));
});

///////////////////////////////////
////// CUSTOM JS INJECT
///////////////////////////////////

gulp.task('js', ['js-inject']);

gulp.task('js-inject', function () {
    gulp.src(paths.index)
        .pipe(inject(gulp.src([paths.src_js]).pipe(angularFilesort()), { relative: true }))
        .pipe(gulp.dest(paths.root));
});

///////////////////////////////////
////// SASS
///////////////////////////////////

gulp.task('sass-concat', function () {
    return gulp.src([paths.app_css_file, paths.src_sass])
        .pipe(sass())
        .pipe(concat('tmp.css'))
        .pipe(gulp.dest(paths.tmp_css_root))
        .pipe(browserSync.stream());
});

gulp.task('sass-inject', ['sass-concat'], function () {
    gulp.src(paths.index)
      .pipe(inject(gulp.src([paths.tmp_css_file], { read: false }), { relative: true }))
      .pipe(gulp.dest(paths.root));
});

gulp.task('sass', ['sass-inject']);
