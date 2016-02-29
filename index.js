#!/usr/bin/env node

/**
 * Module dependencies
 */

var program = require('commander'),
  prompt = require('prompt')
  inputHandler = require('./lib/inputhandler');

function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .description('This tool helps you to manage your npms inside your project')
  .usage('<path>')
  .option('-p, --path', 'Path of your app')
  .action(function (path) {
    console.log(path);
    appPath = path;
  }).parse(process.argv);

/*
 Prompt for file and directory list,
 and get data
 */
var schema = {
  properties: {
    directories: {
      message: 'Please enter the directories seperated by a comma, or leave empty for defaults'
    },
    files: {
      message: 'Please enter the files seperated by a comma, or leave empty for defaults'
    }
  }
};

prompt.start().get(schema, function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  // Check if path argument was passed
    if (typeof appPath !== 'undefined' && appPath) {

    // Path argument was passed

      inputHandler.parseInput(appPath, result.directories, result.files);

    } else {
    // Path argument was'nt passed

      inputHandler.parseInput('', result.directories, result.files);

    }

});