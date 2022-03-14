const gulp = require('gulp');
const gNodemon = require('gulp-nodemon')
const cCSS = require('gulp-clean-css');
const cPrefix = require('gulp-autoprefixer')


gulp.task('css', () => (
    gulp.src('./public/styles/*.css')
    .pipe(cCSS({
        compatibility: 'ie8'
    }))
    .pipe(cPrefix({
        cascade: false
    }))
    .pipe(gulp.dest('public/dist'))
))

gulp.task('watch', () => (
    gulp.watch('./public/styles/*.css', gulp.series('css'))
))

gulp.task('start', (done) => (
    gNodemon({
        script: 'server.js',
        ext: 'css',
        tasks: ['css'],
        ignore: ['public/dist'],
        done: done
    })
))

gulp.task('default', gulp.series('css', 'start'))