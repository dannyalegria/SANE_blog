var gulp = require('gulp');
var concat = require("gulp-concat");
var annotate = require("gulp-ng-annotate");
var concatCss = require("gulp-concat-css")
var sass = require("gulp-sass");

var paths = {
	jsSource: ['./public/**/*.js'],
	csSource: ['./public/**/*.css'],
	sassSource: ['./public/**/*.scss'],
	indexSource: ['./public/**/*.html', 'public/**/*.css'],
	server: ['./server/index.js']
};

gulp.task('js', function() {
	gulp.src(paths.jsSource)
		.pipe(annotate())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
	gulp.src(paths.sassSource)
		.pipe(sass())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('index', function() {
	gulp.src(paths.indexSource)
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['js', 'css', 'sass', 'index']);

gulp.task('watch', function() {
	gulp.watch(paths.jsSource, ['js']);
	gulp.watch(paths.sassSource, ['sass']);
	gulp.watch(paths.indexSource, ['index']);
});

gulp.task('default', ['build', 'watch']);
