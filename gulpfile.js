var gulp        = require('gulp');
var gulp_sass   = require('gulp-sass');
var gulpIf      = require('gulp-if');
var useref      = require('gulp-useref');
var cssnano     = require('gulp-cssnano');
var uglify      = require('gulp-uglify');
var del         = require('del');
var browser     = require('browser-sync').create();
var glob        = require("glob");

gulp.task(  'sass', () => {
    return gulp.src('./app/scss/**.scss')
        .pipe(gulp_sass())
        .pipe(gulp.dest('./app/css'))
        .pipe(browser.reload({stream: true}));
});

gulp.task('uglify', () => {
    glob('app/js/*.js','',  (e, m) => console.log(m) );
    return gulp.src('app/js/*.js')
    .pipe(uglify())
})

gulp.task('cssnano', () => {
    //.pipe(gulpIf('app/css/*.css',  cssnano()))
    glob('app/css/*.css','',(e, m) => console.log(m) );

    return gulp.src('app/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('useref',() => {
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist/', { overwrite: true } ));
});

gulp.task( 'browser', () => {
    browser.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('build', gulp.series( 'sass'
                              , 'cssnano'
                              , 'useref' 
                              , 'uglify' ));

gulp.task( 'watch', gulp.series( 'build'
                               //, 'browser'
                               , () => gulp.watch( [ 'app/scss/'
                                                   , 'app/js/'
                                                   , 'app/fonts/'
                                                   , 'app/pages/'
                                                   , 'app/*.html' ]  
                                                 , gulp.series( ['build'] ))
                                ));

gulp.task('clean', () => { return del.sync('dist'); })