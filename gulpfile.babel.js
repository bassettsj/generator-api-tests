import 'babel-core/register';
import path from 'path';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import nsp from 'gulp-nsp';
import plumber from 'gulp-plumber';
import coveralls from 'gulp-coveralls';
import babel from 'gulp-babel';
import filter from 'gulp-filter';
import { Instrumenter } from 'isparta';

gulp.task('static', () => gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('nsp', (cb) => {
  nsp({ 'package': path.resolve('package.json') }, cb);
});
gulp.task('build', () => {
  const jsFilter = filter(['app/index.js'], { restore: true });

  return gulp.src('src/**/*', {
    base: 'src',
  })
    .pipe(jsFilter)
    .pipe(babel())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('generators'));
});

gulp.task('pre-test', () => gulp.src('src/**/*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
);


gulp.task('test', ['pre-test'], (cb) => {
  let mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec',
      // timeout: 10000,
    }))
    .on('error', (err) => {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', () => {
      cb(mochaErr);
      process.exit(mochaErr ? 1 : null);
    });
});

gulp.task('watch', () => gulp.watch(['src/**/*.js', 'test/**'], ['test']));

gulp.task('coveralls', ['test'], () => gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls())
);

gulp.task('prepublish', ['build', 'nsp']);
gulp.task('default', ['static', 'test', 'coveralls']);
