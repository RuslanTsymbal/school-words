var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', ['html', 'html-components','style', 'img', 'scripts','font','watch']);

gulp.task('style', function () {
    return gulp.src('app/styles/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('font', function () {
    return gulp.src('app/font/**/')
        .pipe(gulp.dest('dist/font/'));
});

gulp.task('img', function () {
    return gulp.src('app/img/*.*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('html-components', function () {
    return gulp.src('app/components/**/*.html')
        .pipe(gulp.dest('dist/components/'))
});

gulp.task('watch', function () {
    gulp.watch('app/styles/*.less', ['style']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/components/**/*.html', ['html-components']);
    gulp.watch('app/components/**/*.js', ['scripts']);
    gulp.watch('app/js/*.js', ['scripts']);
});

gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-chart.js/node_modules/chart.js/dist/Chart.min.js',
        "node_modules/angular-chart.js/dist/angular-chart.min.js",
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'app/js/*.js',
        'app/components/**/*.js'
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/js'));
});
