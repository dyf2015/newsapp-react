var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackConfig = require('./examples/webpack.config');
var clean = require('gulp-clean');

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(WebpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        callback();
    });
});
gulp.task("html", ["clean"], function(callback){
  return gulp.src('examples/**/*.html')
    .pipe(gulp.dest('__build__/'))
})
gulp.task("clean", function(callback){
    return gulp.src('./__build__', {read: false})
    .pipe(clean({force: true}))
})
gulp.task("test", ["html", "webpack"])
// scp -r -P 16322 __build__/* ybduan@223.252.197.245:/home/ybduan/newsapp-react/
