'use strict';

var Linter = require('tslint'),
    glob = require('glob'),
    fs = require('fs');

task('default', function(params) {
    console.log('Please specify a valid task such as lint');
});

desc('Lint the src directory using TSLint');
task('lint', { async: true }, function () {
    function lintFile(filename) {
        var cmd = '$(npm bin)/tslint ' + filename
        jake.exec(cmd, { printStdout: true, printStderr: true, breakOnError: true });
    }

    glob("src/**/*.ts", function (er, files) {
        var file;
        for (var i in files) {
            file = files[i];
            lintFile(file);
        }
        complete();
    });
});


