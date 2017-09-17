const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const del = require('del');

const targetDir = 'dist';
const htmlFiles = 'src/**/*.html';
const scssFiles = 'src/scss/**/*.scss';
const jsFiles = 'src/js/**/*.js';
const otherFiles = ['src/**/*'].concat([htmlFiles, scssFiles, jsFiles].map((pattern) => `!${pattern}`));

gulp.task('default', ['html', 'copy']);

gulp.task('sass', () => {
    return gulp.src(scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(rev())
        .pipe(gulp.dest(`${targetDir}/css`))
        .pipe(rev.manifest({ path: 'rev-manifest-sass.json' }))
        .pipe(gulp.dest('.'))
    ;
});

gulp.task('watch', () => {
    gulp.watch(htmlFiles, ['html']);
    gulp.watch(scssFiles, ['sass']);
    gulp.watch(jsFiles, ['js']);
    gulp.watch(otherFiles, ['copy']);
});

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(`${targetDir}/js`))
        .pipe(rev.manifest({ path: 'rev-manifest-js.json' }))
        .pipe(gulp.dest('.'))
    ;
});

gulp.task('html', ['sass', 'js'], () => {
    return gulp.src(htmlFiles)
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            decodeEntities: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(revReplace({ manifest: gulp.src('./rev-manifest-js.json') }))
        .pipe(revReplace({ manifest: gulp.src('./rev-manifest-sass.json') }))
        .pipe(gulp.dest(targetDir))
    ;
});

gulp.task('copy', () => {
    return gulp.src(otherFiles)
        .pipe(gulp.dest(targetDir));
});

gulp.task('clean', () => {
    del([`${targetDir}/*`, `!${targetDir}/.gitkeep`, `rev-manifest*.json`]);
});
