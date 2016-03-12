#!/usr/bin/env node

/**
 * Module dependencies
 */
require('colors');
var program = require('commander'),
  process = require('process'),
  prompt = require('prompt'),
  inputHandler = require('./lib/inputhandler'),
  fsHandler = require('./lib/fshandler'),
  winston = require('winston'),
  builtinModules = require('builtin-modules');

var files,
  appPath = process.cwd() + '\\';


program
  .version('0.0.1')
  .description('This tool helps you to manage your npms inside your project')
  .usage('<path>')
  .option('-p, --path <path>', 'Path of your app')
  .option('-e, --error', 'Get only error logs')
  .option('-l, --log', 'Write logs to file')
  .action(function (path) {
    appPath = path;
  }).parse(process.argv);

if(program.error)
  winston.level = 'error';

if(program.log)
  winston.add(winston.transports.File, { filename: appPath + 'managedep.log' });

var pkgJson = fsHandler.getPkgJsn(appPath);
if(pkgJson == '') {
  winston.error('Please check that you have submitted a node js app directory'.red);
  return ;
}

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

  files = inputHandler.parseInput(appPath, result.directories, result.files);

  var pkgDependencies = pkgJson.dependencies;
  var dependecies = inputHandler.handleFiles(files);

  for (var dep in pkgDependencies) {
    if (!dependecies[dep]) {
      winston.log('error', 'Package not in use: ' + dep.cyan);
    }
  }

  for (var dep in dependecies) {
    if (!pkgDependencies[dep] && builtinModules.indexOf(dep) == -1) {
      winston.log('error', 'Package used but not saved: ' + dep.yellow);
    }
  }

  // TODO: Print something if everything was ok

});