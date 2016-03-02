/***************************************************************/
/*
  This file will contain all functions that will handle user input,
  and files list preparation which will be used later for comparing
  with the pkg list.
 */
/**************************************************************/

/**
 * Module dependencies
 */
require('colors');
var fsHandler = require('./fshandler');

var defaultDirs = ['controllers', 'routes', 'models'];

/**
 * This function will parse user input
 *
 * @param appPath
 * @param directories
 * @param files
 */
exports.parseInput = function(appPath, directories, files) {

  var pkgJson = fsHandler.getPkgJsn(appPath);
  var pkgDependencies = pkgJson.dependencies;
  directories = directories.split(',');

  console.log('These are your current app %j dependencies: '.yellow, pkgJson.name);

  for(var dep in pkgDependencies){
    console.log('Dependency: ' + dep + ' Version: ' + pkgDependencies[dep]);
  }

  // Checking if any directories have been entered
  if(directories.length > 0) {
    fsHandler.getDirFiles(appPath, directories);
  } else {
    fsHandler.getDirFiles(appPath, defaultDirs);
  }

};