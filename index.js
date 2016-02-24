#!/usr/bin/env node

/**
 * Module dependencies
 */

require('colors');
var program = require('commander'),
    fs = require('fs');

program
    .version('0.0.1')
    .arguments('<path>')
    .action(function(path){
        appPath = path;
    })
    .parse(process.argv);

// Check if path argument was passed
if ( typeof appPath !== 'undefined' && appPath ) {

    // Path argument was passed

} else {

    // Path argument was'nt passed

    var obj = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('These are the packages that are currently installed on your system:'.yellow);
    for(var dep in obj.dependencies) {
        console.log('Package: ' + dep + ' Version: ' + obj.dependencies[dep]);
    }
}