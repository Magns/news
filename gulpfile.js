var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html", ['html']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// html
gulp.task('html', function() {
    return gulp.src("app/*.html")
      .pipe(gulp.dest("dist"));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

//JS libraries
gulp.task('jquery', function() {
  return gulp.src("bower_components/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("dist/lib/"));
});

gulp.task('vue', function() {
  return gulp.src("bower_components/vue/dist/vue.js")
    .pipe(gulp.dest("dist/lib/"));
});

gulp.task('default', ['serve', 'jquery', 'vue', 'html', 'sass']);


// TODO: Separate dev/dist versions
gulp.task('build', ['html', 'jquery', 'vue', 'sass']);
