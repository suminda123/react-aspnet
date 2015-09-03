var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var symlink = require('gulp-symlink');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './app/**/*.js',
        images: './src/images/*',
        css: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
          'node_modules/toastr/toastr.css'
        ],
        dist: './',
        mainJs: './app/components/app.js'
    }
};

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist));

});

gulp.task('clean', function () {
    return gulp.src(['./app/prod/**/*.js','bundle.js'], { read: false })
    .pipe(clean({ force: true }));
});


gulp.task("symlink", function () {
    return gulp.src('./app/')
        .pipe(symlink('./node_modules/app/', { force: true }));
});

gulp.task('browserify', function () {
    var b = browserify();
    b.transform(reactify); // use the reactify transform
    b.add('./node_modules/app/components/app.js');
    return b.bundle()
      .pipe(source('app.js'))
        .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./'));
});

gulp.task('build', ['clean', 'symlink','browserify']);