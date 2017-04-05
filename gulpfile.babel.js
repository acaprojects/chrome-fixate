import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import zip from 'gulp-zip';
import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';
import { name, version } from './package.json';

const paths = {
  allSrcJs: 'src/**/*.js',
  allSrcCss: 'src/**/*.?(s)css',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  distDir: 'dist/',
  releaseDir: 'release/'
};

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('clean', () =>
  del([paths.distDir])
);

gulp.task('build', ['lint', 'clean'], callback =>
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  })
);

gulp.task('watch', () =>
  gulp.watch([paths.allSrcJs, paths.allSrcCss], ['build'])
);

gulp.task('release', ['build'], () =>
  gulp.src(`${paths.distDir}*`)
    .pipe(zip(`${name}_${version}.zip`))
    .pipe(gulp.dest(paths.releaseDir))
);

gulp.task('default', ['watch', 'build']);
