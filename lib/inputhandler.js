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
var fsHandler = require('./fshandler');

var defaultDirs = ['controllers', 'routes', 'models'];

var defaultFiles = ['app.js', 'index.js'];

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

  // Initiating dir list
  directories = directories.split(',');
  if(directories.length == 0) {
    directories = defaultDirs;
  }

  var files = [];

  console.log('These are your current app %j dependencies: '.yellow, pkgJson.name);

  for(var dep in pkgDependencies){
    console.log('Dependency: ' + dep + ' Version: ' + pkgDependencies[dep]);
  }

  fsHandler.getDirFiles(appPath, directories, function(files){
    files.concat(files);
    console.log(files)
  });

};