/**
 * @type {Gulp|{pipe: function}}
 */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const jasmine = require('gulp-jasmine');
const plumber = require('gulp-plumber');

gulp
  .task('lint', () => gulp.src([
    './**/*.js',
    '!coverage/**',
    '!config/**',
    '!./**/node_modules/**'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp
  .task('pre-test', () => gulp.src([
    './components/**/*.js',
    '!./**/*spec.js'
  ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()));

gulp
  .task('test', ['pre-test'], () => gulp.src([
    './components/**/*.spec.js'
  ])
    .pipe(plumber())
    .pipe(jasmine())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })));
