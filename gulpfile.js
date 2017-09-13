const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

const targetDir = 'dist';

gulp.task('default', ['sass', 'js']);

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest(targetDir))
});

gulp.task('sass:watch', () => {
   gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(targetDir));
});