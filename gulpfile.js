const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

const targetDir = 'dist';
const htmlFiles = 'src/**/*.html';
const scssFiles = 'src/scss/**/*.scss';
const jsFiles = 'src/js/**/*.js';

gulp.task('default', ['html', 'sass', 'js']);

gulp.task('sass', () => {
    return gulp.src(scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest(`${targetDir}/css`))
});

gulp.task('watch', () => {
    gulp.watch(htmlFiles, ['html']);
    gulp.watch(scssFiles, ['sass']);
    gulp.watch(jsFiles, ['js']);
});

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(gulp.dest(`${targetDir}/js`));
});

gulp.task('html', () => {
    return gulp.src(htmlFiles)
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            decodeEntities: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(gulp.dest(targetDir));
});
