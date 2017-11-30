var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  typescript = require('gulp-typescript'),
  merge = require('merge2'),
  webserver = require('gulp-webserver'),
  less = require('gulp-less'),
  gulputil = require('gulp-util'),
  gulpFilter = require('gulp-filter'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  zip = require('gulp-zip'),
  plumber = require('gulp-plumber'),
  shell = require('gulp-shell');
var gulpif = require('gulp-if');
var serverConfig = require('./Server/config.json');

const pluginObjects = serverConfig.plugins.filter((item) => {
  return item.enabled
});

const plugins = pluginObjects.map((plugin) => {
  return plugin.foldername;
});
/// ********

/// GLOBAL

gulp.task('default', ['atool-plugin'], function(){
  return gulp.start('default-server-all');
});

gulp.task('default-server-all', ['default-plugins', 'copyDTS-plugins'], function(){
  return gulp.start('default-server');
});


//// *****

//****

// PLUGIN PART

// ***

/**
 * Compile typescript files to their js respective files
 */

gulp.task('typescript-to-js-plugins', function() {
  //Compile all ts file into their respective js file.
  return gulp.src(['Plugins/Vorlon/**/*.ts', 'Plugins/libs/**.ts'])
    .pipe(plumber());
});



/* Compile less files to their css respective files
*/
gulp.task('less-to-css-plugins', function() {
  return gulp.src(['Plugins/Vorlon/**/*.less'], { base : '.' })
    .pipe(less())
    .pipe(gulp.dest(''));
});

/**
 * Concat all js files in order into one big js file and minify it.
 * Do not hesitate to update it if you need to add your own files.
 */
gulp.task('atool-plugin', shell.task([
  'npm run atool-plugin'
]));

gulp.task('scripts-noplugin-plugins-pre', ['typescript-to-js-plugins'], function() {
  return gulp.src([
    'Plugins/release/entry/*'
  ]).pipe(gulp.dest('Plugins/release/'));
})

gulp.task('scripts-noplugin-plugins', ['scripts-noplugin-plugins-pre'], function() {

  return gulp.src([
    'Plugins/release/entry/*.js'
  ])
    .pipe(rename(function (path) {
        path.extname = ".min.js";
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('Plugins/release/'));
});


gulp.task('concat-webstandards-rules-plugins', ['typescript-to-js-plugins'], function () {
  return gulp.src([
      './Plugins/release/**/webstandards/rules/*.js',
      './Plugins/release/**/webstandards/vorlon.webstandards.client.js'
    ])
    .pipe(concat('vorlon.webstandards.client.js'))
    .pipe(gulp.dest('Plugins/release/plugins/webstandards/'));
});

/**
 * Specific task that need to be handled for specific plugins.
 * Do not hesitate to update it if you need to add your own files
 */
gulp.task('scripts-specific-plugins-plugins', ['scripts-plugins'], function() {

});



/**
 * Minify all plugins.
 * Do not hesitate to update it if you need to add your own files.
 */
gulp.task(
'scripts-plugins',
[], // ['concat-webstandards-rules-plugins']
function () {

  return gulp.src([
    './Plugins/**/vorlon.*.js',
    '!./Plugins/**/vorlon.*.min.js',
    '!./Plugins/**/*'
  ])
    .pipe(plumber())
    .pipe(rename(function (path) {
        path.extname = ".min.js";
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./Plugins'));
});

/**
 * Move all files from Plugins to Server
 */
gulp.task('copy-plugins', function () {

  return gulp.src([
    'Plugins/release/*',
  ])
    .pipe(gulp.dest('./Server/public/vorlon'));

});

gulp.task('copyPlugins-plugins', function () {

  return  gulp.src([
    'Plugins/Vorlon/plugins/**/*.js',
    'Plugins/Vorlon/plugins/**/*.css',
    'Plugins/Vorlon/plugins/**/*.html',
    'Plugins/Vorlon/plugins/**/*.png',
    'Plugins/Vorlon/plugins/**/*.PNG',
    'Plugins/release/plugins/**/*.js'
  ])
    .pipe(gulp.dest('./Server/public/vorlon/plugins'));

});

gulp.task('copyDTS-plugins', function () {

  return  gulp.src(['Plugins/release/*.d.ts'])
    .pipe(gulp.dest('./Server/Scripts/typings/Vorlon'));

});

/**
 * The default task, call the tasks: scripts, scripts-noplugin, copy, copyPlugins
 */
gulp.task('default-plugins', ['scripts-plugins', 'scripts-noplugin-plugins', 'less-to-css-plugins', 'scripts-specific-plugins-plugins'], function() {
  return gulp.start('copy-plugins', 'copyPlugins-plugins', 'copyDTS-plugins');
});

/**
 * Watch task, will call the default task if a js file is updated.
 */
//gulp.task('watch', function() {
//  gulp.watch('src/**/*.js', ['default']);
//});

/**
 * Watch typescript task, will call the default typescript task if a typescript file is updated.
 */
gulp.task('watch-plugins', function() {
  return gulp.watch([
    'Plugins/Vorlon/**/*.less',
    'Plugins/Vorlon/**/*.html',
    'Plugins/Vorlon/**/*.js',
    'Plugins/Vorlon/**/*.css',
    '!Plugins/Vorlon/**/*.ts',
    //'Vorlon/plugins/**/*.*',
  ], ['default-plugins']);
});


gulp.task('noplugins-build-copy', ['scripts-noplugin-plugins'], function(){
  return gulp.start('copy-plugins');
});


gulp.task('watch-noplugins', function() {
  return gulp.watch([
    'Plugins/entry/**/*',
    'Plugins/components/**/*',
    'Plugins/pages/**/*'
  ], ['noplugins-build-copy'])
})
/**
 * Web server task to serve a local test page
 */
gulp.task('webserver', function() {
  return gulp.src('client samples/webpage')
    .pipe(webserver({
      livereload: false,
      open: 'http://localhost:1338/index.html',
      port: 1338,
      fallback: 'index.html'
    }));
});

//****

// SERVER PART

// ***

gulp.task('typescript-to-js-server', function() {
  var tsResult = gulp.src([
    './Server/**/*.ts',
    '!./Server/node_modules',
    '!./Server/node_modules/**'
  ], { base: './' })
  // .pipe(sourcemaps.init())
    .pipe(typescript({
      noExternalResolve: true,
      target: 'ES5',
      module: 'commonjs'
    }));

  return tsResult.js
    .pipe(sourcemaps.write({
      includeContent: false,
      // Return relative source map root directories per file.
      sourceRoot: function (file) {
        // var sourceFile = path.join(file.cwd, file.sourceMap.file);
        // return path.relative(path.dirname(sourceFile), file.cwd);
      }
    }))
    .pipe(gulp.dest('.'));
});



gulp.task('default-server', ['typescript-to-js-server'], function() {
});

/**
 * Watch typescript task, will call the default typescript task if a typescript file is updated.
 */
gulp.task('watch-server', function() {
  gulp.watch([
    './Server/**/*.ts',
  ], ['default-server']);
});


//gulp.task('watch', ["watch-server", "watch-plugins", "watch-noplugins"], function() {
//});

gulp.task('watch-entry', function() {
  return  gulp.src([
    'Plugins/release/entry/*'
  ])
    .pipe(gulp.dest('./Server/public/vorlon'));
});

gulp.task('watch-less',  function() {
  return  gulp.src([
    'Plugins/Vorlon/plugins/**/*.less'
  ])
    .pipe(less())
    .pipe(gulp.dest('./Plugins/Vorlon/plugins'));
});

gulp.task('watch-copy', function() {
  return  gulp.src([
    'Plugins/Vorlon/plugins/**/*.js',
    'Plugins/Vorlon/plugins/**/*.css',
    'Plugins/Vorlon/plugins/**/*.html',
    'Plugins/Vorlon/plugins/**/*.png',
    'Plugins/Vorlon/plugins/**/*.PNG',
    '!Plugins/Vorlon/plugins/**/components/*',
    'Plugins/release/plugins/**/*'
  ]).pipe(gulpif((file) => {
    const reg = new RegExp(plugins.join('|'));
    return reg.test(file.path);
  }, gulp.dest('./Server/public/vorlon/plugins')));

});

gulp.task('watch-allplugins',  function () {
  return gulp.start('watch-less','watch-entry','watch-copy');
});

gulp.task('watch', ['watch-server', 'watch-allplugins'], function() {
  gulp.watch([
    'Plugins/Vorlon/plugins/**/*.js',
    'Plugins/Vorlon/plugins/**/*.less',
    'Plugins/Vorlon/plugins/**/*.html',
    'Plugins/Vorlon/plugins/**/*.png',
    'Plugins/Vorlon/plugins/**/*.PNG',
    'Plugins/release/plugins/**/*',
    'Plugins/release/entry/*'
    ], ['watch-allplugins']
  );
});

/**
 * Zip task used within the build to create an archive that will be deployed using VSTS Release Management
 */

gulp.task('zip', function() {
  gulp.src(['./**/*', '!./DeploymentTools/**', '!./desktop/**', '!./plugins library/**', '!./Plugins/**', '!./Tests/**', '!./desktop', '!./plugins library', '!./DeploymentTools', '!./Plugins', '!./Tests'])
    .pipe(zip('deployment-package.zip'))
    .pipe(gulp.dest('DeploymentTools'));
});