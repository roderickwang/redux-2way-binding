/**
 * Created by roderickWang on 9/2/15.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

