'use strict';
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob = require('glob');
var path = require('path');
var filePath = require('./filePath.js');

function removeExtentionAndPath(file, extension){
  var extStart = file.indexOf('.' + extension);
  var fileStart = file.lastIndexOf('/');
  return file.slice(fileStart + 1, extStart);
}
function browserified(filename) {
  var b = browserify(filename,{debug: true});
  var fileNoExt = removeExtentionAndPath(filename, 'jsx');
  var p = filePath(fileNoExt);
  b.bundle()
    .on('error', gutil.log)
    .pipe(source(fileNoExt + '.js'))
    .pipe(buffer())
    .pipe(gulp.dest(path.join(p, 'js')));
}

module.exports = function() {
  glob('./src/react/pages/*.jsx', {}, function(err, files){
    files.forEach(browserified);
  });
};
