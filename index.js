#!/usr/bin/env node

/**
 * Module dependencies
 */
require('colors');
var program = require('commander'),
  prompt = require('prompt'),
  inputHandler = require('./lib/inputhandler'),
  fsHandler = require('./lib/fshandler');

var files;

program
  .version('0.0.1')
  .description('This tool helps you to manage your npms inside your project')
  .usage('<path>')
  .option('-p, --path', 'Path of your app')
  .action(function (path) {
    appPath = path;
  }).parse(process.argv);

/*
 Prompt for file and directory list,
 and get data
 */
var schema = {
  properties: {
    directories: {
      message: 'Please enter the directories seperated by a comma, or leave empty for defaults(Check readme)'
    },
    files: {
      message: 'Please enter the files seperated by a comma, or leave empty for defaults'
    }
  }
};

// Get files and directories from user
prompt.start().get(schema, function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  // Check if path argument was passed
  if (typeof appPath !== 'undefined' && appPath) {

    // Path argument was passed
    // Read PKG json and its dependencies
    var pkgJson = fsHandler.getPkgJsn(appPath);
    files = inputHandler.parseInput(appPath, result.directories, result.files);

  } else {
    // Path argument was'nt passed
    // Read PKG json and its dependencies
    var pkgJson = fsHandler.getPkgJsn('');
    files = inputHandler.parseInput('', result.directories, result.files);

  }

  var pkgDependencies = pkgJson.dependencies;
  var dependecies = inputHandler.handleFiles(files);

  for (var k in pkgDependencies) {
    if (!dependecies[k]) {
      console.log("Not in use ".red + k.red); // TODO: delete this later
    }
  }

});