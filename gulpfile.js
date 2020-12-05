var gulp        = require('gulp');
var gulp_sass   = require('gulp-sass');
var gulpIf      = require('gulp-if');
var useref      = require('gulp-useref');
var cssnano     = require('gulp-cssnano');
var uglify      = require('gulp-uglify');
var del         = require('del');
var glob        = require("glob");
var open        = require('gulp-open');
var watch       = require('gulp-watch');
var run         = require('gulp-run');

const { parallel } = require('gulp');

var browser     = require('browser-sync').create();

const URI = 'http://localhost:3000/';

gulp.task(  'sass', () => {
    return gulp.src('./client/app/scss/**.scss')
        .pipe(gulp_sass())
        .pipe(gulp.dest('./client/app/css'))
        .pipe(browser.reload({stream: true}));
});

gulp.task('uglify', () => {
    glob('client/app/js/*.js','',  (e, m) => console.log(m) );
    return gulp.src('client/app/js/*.js')
    .pipe(uglify())
})

gulp.task('cssnano', () => {
    //.pipe(gulpIf('app/css/*.css',  cssnano()))
    glob('client/app/css/*.css','',(e, m) => console.log(m) );

    return gulp.src('client/app/css/*.css')
                .pipe(cssnano())
                .pipe(gulp.dest('client/dist/css'))
})

gulp.task('useref',() => {
    return gulp.src('client/app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('client/dist/', { overwrite: true } ));
});

gulp.task( 'browser', () => {
    browser.init({
        server: {
            baseDir: 'client/app'
        },
    })
})

gulp.task('build', gulp.series( 'sass'
                              , 'cssnano'
                              , 'useref' 
                              , 'uglify' ));

gulp.task('open', function(){
    gulp.src(__filename)
    .pipe(open({uri: URI}));
});

gulp.task( 'init-watch', () => {
    return gulp.watch( [ 'client/app/scss/', 'client/app/js/', 'client/app/fonts/', 'client/app/pages/', 'client/app/*.html' ], gulp.series('build'));
});

gulp.task( 'server' , () => {
    return run('node ./server/app.js').exec()
})

gulp.task( 'watch-server', gulp.series(['build',parallel('server', 'init-watch', 'open' )]))

gulp.task( 'watch' , gulp.series( ['build', parallel( 'init-watch', 'open')] ));

gulp.task('clean', () => { return del.sync('dist'); })