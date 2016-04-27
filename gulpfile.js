var gulp = require('gulp'),
    asciidoctor = require('gulp-asciidoctor'),
    watch = require('gulp-watch');

//our root input directory
var PATH_IN = './';
//the root input for documentation
var PATH_IN_DOC = PATH_IN + 'docs/';
//the documentation start page
var PATH_IN_DOC_START = PATH_IN_DOC + 'index.adoc';
//the filter for documentation css source files
var PATH_IN_DOC_CSS = PATH_IN_DOC + '**/*.css';

//the root output folder (configured in gitignore)
var PATH_OUT = 'dist/';
//the output folder for documentation
var PATH_OUT_DOC = PATH_OUT + '/docs';

/*
  create the documentation html based on
  the adoc files
*/
gulp.task('createDoc', function () {
    return gulp.src(PATH_IN_DOC_START)
        .pipe(asciidoctor({
            safe: 'unsafe',
            attributes: ['showtitle', 'linkcss!']
        }))
        .pipe(gulp.dest(PATH_OUT_DOC));
});

/*
 this task can be used for development
 every change in a *.adoc or *.css file will
 result in a new build
 */
gulp.task('dev', function () {
    return gulp.src(PATH_IN_DOC_START)
        .pipe(watch([PATH_IN_DOC_START, PATH_IN_DOC_CSS]))
        .pipe(asciidoctor({
            safe: 'unsafe',
            attributes: ['showtitle', 'linkcss!']
        }))
        .pipe(gulp.dest(PATH_OUT_DOC));
});


gulp.task('default', ['createDoc'], function () {});