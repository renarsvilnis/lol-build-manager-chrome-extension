'use strict';

// ########################################
// Modules
// ########################################
var del        = require('del'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify   = require('babelify');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  camelize: true,
  lazy: false,
});

// ########################################
// Variables
// ########################################

// current enviroment
var env = process.env.NODE_ENV || 'development';

var IN_BASE  = 'src/';
var OUT_BASE = 'dist/';
var BOWER    = 'bower_components/';

var IN  = {
  CSS   : IN_BASE + 'scss/',
  JS    : IN_BASE + 'js/',
  IMG   : IN_BASE + 'img/',
  FONTS : IN_BASE + 'fonts/',
  HTML  : IN_BASE + 'html/',
};

var OUT = {
  CSS   : OUT_BASE + 'stylesheets/',
  JS    : OUT_BASE + 'javascripts/',
  IMG   : OUT_BASE + 'images/',
  FONTS : OUT_BASE + 'fonts/',
  HTML  : OUT_BASE,
  ICONS : OUT_BASE + 'icons/',
};


// ########################################
// Helpers
// ########################################
var isProduction = function() {
  return env === 'production';
};

var isDevelopment = function() {
  return env === 'development';
};


// ########################################
// Tasks
// ########################################

gulp.task('clean', function(cb) {
  del([OUT_BASE], cb);
});

// ####################
// HTML
// ####################
gulp.task('manifest', function() {
  return gulp.src(IN_BASE + 'manifest.json')
    .pipe(gulp.dest(OUT_BASE));
});

// ####################
// IMAGES
// ####################
gulp.task('images', function() {
  return gulp.src(IN.IMG + '**/*')
    .pipe($.if(isProduction(), $.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {cleanupIDs: false}
      ]
    })))
    .pipe(gulp.dest(OUT.IMG));
});


// ####################
// Javacript
// ####################
gulp.task('browserify', function() {

  var filename = 'background.js';

  return browserify({
    entries: IN.JS + filename,
    debug: true,
  })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.log('Error:', err.message);
    })
    .pipe(source(filename))
    .pipe(gulp.dest(OUT.JS));
});

// ####################
// TASKS
// ####################
gulp.task('default', ['clean'], function() {
  gulp.start('manifest', 'images', 'browserify', function(){

    // only launch in development
    if(isDevelopment()) {
      gulp.start('watch', function() {
        console.log('Listening for changes');
      });  
    }
    
  });
});

gulp.task('watch', function () {
  gulp.watch(IN_BASE + 'manifest.json', ['manifest']);
  gulp.watch(IN.IMG + '**/*', ['images']);
  gulp.watch(IN.JS + '**/*.{js,jsx}', ['browserify']);
});