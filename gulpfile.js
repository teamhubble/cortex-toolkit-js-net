var args = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpUtil = require('gulp-util');
var mergeStream = require('merge-stream');
var rename = require('gulp-rename');
var tslint = require('gulp-tslint');
var webpack = require('webpack');
var mCompiler;
gulp.task('default', ['compile']);
gulp.task('compile', ['lint', 'build']);
gulp.task('lint', DoLinting);
gulp.task('build', CompileScripts);

function DoLinting() {
    // Linting the typescript
    function lintTS() {
        return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            reportLimit: 4
        }));
    }

    return lintTS();
}

function CompilerCallback(err, stats){
    if(err){
        throw new gulpUtil.PluginError("webpack", err);
    }

    gulpUtil.log("[webpack]", stats.toString({colors:true}));
}

function CompileScripts() {
    var config = require('./webpack.config.js');
    gulpUtil.log(JSON.stringify(config));
    mCompiler = webpack(config, CompilerCallback.bind(this));
}
