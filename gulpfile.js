var gulp = require('gulp');
var rollup = require('gulp-better-rollup');
var sucrase = require('@sucrase/gulp-plugin');
var minify = require('gulp-minify');

var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var json = require('rollup-plugin-json');
var builtins = require('@joseph184/rollup-plugin-node-builtins');
var rootImport = require('rollup-plugin-root-import');
var globals = require('rollup-plugin-node-globals');

/***
  Main config options
***/

var urbitrc = require('./.urbitrc');

/***
  End main config options
***/

gulp.task('tile-jsx-transform', function(cb) {
  return gulp.src('tile/**/*.js')
    .pipe(sucrase({
      transforms: ['jsx']
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('tile-js-imports', function(cb) {
  return gulp.src('dist/tile.js')
    .pipe(rollup({
      plugins: [
        commonjs({
          namedExports: {
            'node_modules/react/index.js': [ 'Component' ],
          }
        }),
        rootImport({
          root: `${__dirname}/dist/js`,
          useEntry: 'prepend',
          extensions: '.js'
        }),
        json(),
        globals(),
        builtins(),
        resolve()
      ]
    }, 'umd'))
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(gulp.dest('./urbit/app/%APPNAME%/js/'))
    .on('end', cb);
});

gulp.task('tile-js-minify', function () {
  return gulp.src('./urbit/app/%APPNAME%/js/tile.js')
    .pipe(minify())
    .pipe(gulp.dest('./urbit/app/%APPNAME%/js/'));
});

gulp.task('urbit-copy', function () {
  let ret = gulp.src('urbit/**/*');

  urbitrc.URBIT_PIERS.forEach(function(pier) {
    ret = ret.pipe(gulp.dest(pier));
  });

  return ret;
});

gulp.task('tile-js-bundle-dev', gulp.series('tile-jsx-transform', 'tile-js-imports'));
gulp.task('tile-js-bundle-prod',
  gulp.series('tile-jsx-transform', 'tile-js-imports', 'tile-js-minify'));

gulp.task('bundle-prod', gulp.series('tile-js-bundle-prod', 'urbit-copy'));

gulp.task('default', gulp.series('tile-js-bundle-dev', 'urbit-copy'));
gulp.task('watch', gulp.series('default', function() {
  gulp.watch('tile/**/*.js', gulp.parallel('tile-js-bundle-dev'));
  gulp.watch('urbit/**/*', gulp.parallel('urbit-copy'));
}));
